import { foldersState, LayoutContentRefContext, rightBasicState } from "@/store";
import { Row, Layout, Col, Typography, theme, Card, Empty } from "antd";
import _ from "lodash";
import { useRouter } from "next/router";
import { useCallback, useContext, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import { handleImageAlt, handleImageUrl, transformFolderToTree } from "@/hooks";
import JustifyLayout from "@/components/JustifyLayout";
import { useInfiniteScroll } from "ahooks";

interface Params {
  page: number;
  pageSize: number;
}

interface Result {
  list: EagleUse.Image[];
  params: Params;
  count: number;
  size: number;
}

function getLoadMoreList(id: string, params: Params): Promise<Result> {
  const { page, pageSize } = params;

  return new Promise((resolve) => {
    fetch(`/api/image?page=${page}&pageSize=${pageSize}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        where: {
          AND: [{ folders: { some: { id: { in: id } } } }, { isDeleted: false }],
        },
        include: { tags: true },
        orderBy: { modificationTime: "desc" },
      }),
    })
      .then((res) => res.json())
      .then(({ data, count, size }) => {
        resolve({
          list: data,
          count,
          size,
          params: {
            ...params,
            page: page + 1,
          },
        });
      });
  });
}

const Page = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  const { id } = router.query;

  const folders = useRecoilValue(foldersState);
  const foldersTree = useMemo(() => transformFolderToTree(folders), [folders]);
  const [rightBasic, setRightBasic] = useRecoilState(rightBasicState);

  const [params] = useState<Params>({
    page: 1,
    pageSize: 50,
  });

  const LayoutContentRef = useContext(LayoutContentRefContext);
  const infiniteScroll = useInfiniteScroll((d) => id && getLoadMoreList(id as string, d?.params || params), {
    target: LayoutContentRef.current,
    threshold: 300,
    reloadDeps: [id],
    isNoMore: (data) => {
      if (!data) return false;
      const { params, count } = data;
      return params.page >= Math.ceil(count / params.pageSize);
    },
    onFinally: (data) => {
      if (rightBasic.fileSize != data.size) {
        setRightBasic((rightBasic) => ({
          ...rightBasic,
          fileSize: data.size,
        }));
      }
    },
  });

  const folder = useMemo(() => {
    return foldersTree.find((item) => item.id === id) || folders.find((item) => item.id === id);
  }, [folders, id, foldersTree]);

  const imageJSX = (images: EagleUse.Image[]) => {
    if (!images.length)
      return (
        <div
          style={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Empty description={false} image={Empty.PRESENTED_IMAGE_DEFAULT} />
        </div>
      );

    const thumbnail = images[0];

    return (
      <Image
        src={handleImageUrl(thumbnail)}
        width={0}
        height={150}
        alt={handleImageAlt(thumbnail)}
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
    );
  };

  const childrenJSX = useCallback(() => {
    if (!folder) return null;

    const { children } = folder;

    if (_.isEmpty(children)) return null;

    return (
      <Layout.Content style={{ padding: 10 }}>
        <Typography.Text>子文件夹({children.length})</Typography.Text>
        <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
          {children.map((item) => (
            <Col key={item.id} span={3}>
              <Card
                size="small"
                hoverable
                cover={imageJSX(item.images)}
                bodyStyle={{
                  textAlign: "center",
                  backgroundColor: token.colorBgContainer,
                }}
                bordered
                onClick={() => router.push(`/folder/${item.id}`)}
                style={{ backgroundColor: "transparent", overflow: "hidden" }}
              >
                <Typography.Text>{item.name}</Typography.Text>
                <br />
                <Typography.Text type="secondary">{`${item._count.images || 0}个文件`}</Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    );
  }, [folder, router, token]);

  const contentJSX = useCallback(() => {
    if (!folder) return null;
    if (!infiniteScroll.data) return;

    const { children } = folder;

    return (
      <>
        {children && children.length > 0 && (
          <Layout.Content style={{ padding: 10, marginTop: 10 }}>
            <Typography.Text>内容({infiniteScroll.data.count || 0})</Typography.Text>
          </Layout.Content>
        )}
        <JustifyLayout infiniteScroll={infiniteScroll} />
      </>
    );
  }, [folder, infiniteScroll]);

  return (
    <Layout>
      {childrenJSX()}
      {contentJSX()}
    </Layout>
  );
};

export default Page;
