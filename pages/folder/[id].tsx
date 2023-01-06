import { foldersState } from "@/store";
import { Row, Layout, Col, Typography, theme, Card, Empty } from "antd";
import _ from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { handleImageUrl, transformFolderToTree } from "@/hooks";
import JustifyLayout from "@/components/JustifyLayout";

interface Params {
  page: number;
  pageSize: number;
}

const Page = () => {
  const [dataSource, setDataSource] = useState<{
    count: number;
    data: EagleUse.Image[];
  }>({
    count: 0,
    data: [],
  });
  const { token } = theme.useToken();
  const router = useRouter();
  const { id } = router.query;

  const folders = useRecoilValue(foldersState);
  const foldersTree = useMemo(() => transformFolderToTree(folders), [folders]);

  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 50,
  });
  const isLoad = useRef(false);

  const folder = useMemo(() => {
    return (
      foldersTree.find((item) => item.id === id) ||
      folders.find((item) => item.id === id)
    );
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

    const src = handleImageUrl(images[0]);
    return (
      <Image
        src={src}
        width={0}
        height={150}
        alt={src}
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
    );
  };

  const childrenJSX = (folder: EagleUse.Folder) => {
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
                <Typography.Text type="secondary">{`${
                  item._count.images || 0
                }个文件`}</Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    );
  };

  const contentJSX = (folder: EagleUse.Folder) => {
    if (!folder) return null;

    const { children } = folder;

    return (
      <>
        {children && children.length > 0 && (
          <Layout.Content style={{ padding: 10, marginTop: 10 }}>
            <Typography.Text>内容({dataSource.count})</Typography.Text>
          </Layout.Content>
        )}
        <JustifyLayout
          images={dataSource.data}
          isLoad={isLoad.current}
          isEnd={dataSource.data.length === dataSource.count}
          onLoadmore={() => {
            setParams({
              ...params,
              page: params.page + 1,
            });
            isLoad.current = true;
          }}
        />
      </>
    );
  };

  const getImageList = useCallback(() => {
    if (isLoad.current) return;

    isLoad.current = true;
    fetch(
      `/api/image/folder/${id}?page=${params.page}&pageSize=${params.pageSize}`
    )
      .then((res) => res.json())
      .then(({ data, count }) => {
        setDataSource((dataSource) => ({
          count,
          data: params.page === 1 ? data : dataSource.data.concat(data),
        }));
        isLoad.current = false;
      });
  }, [id, params]);

  useEffect(() => {
    setParams((params) => ({
      ...params,
      page: 1,
    }));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getImageList();
  }, [params.page, id, getImageList]);

  return (
    <Layout>
      {childrenJSX(folder)}
      {contentJSX(folder)}
    </Layout>
  );
};

export default Page;
