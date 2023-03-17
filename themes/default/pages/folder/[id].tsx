import { useRouter } from "next/router";
import Page, { PageHandle } from "..";
import { createRef, useEffect, useMemo, useState } from "react";
import { Card, Col, Empty, Layout, Row, Typography, theme } from "antd";
import { transformFolderToTree } from "@/utils";
import { useRecoilValue } from "recoil";
import { foldersState } from "@/store";
import CustomImage from "@/components/CustomImage";

const FolderPage = () => {
  const router = useRouter();
  const pageRef = createRef<PageHandle>();
  const [lastId, setLastId] = useState<string>();
  const folders = useRecoilValue(foldersState);
  const foldersTree = useMemo(() => transformFolderToTree(folders), [folders]);
  const { token } = theme.useToken();

  const { id } = router.query;

  const folder = useMemo(() => {
    return foldersTree.find((item) => item.id === id) || folders.find((item) => item.id === id);
  }, [folders, id, foldersTree]);

  useEffect(() => {
    if (id && lastId != id) {
      setLastId(id as string);
      pageRef.current?.reload();
    }
  }, [id, pageRef, lastId]);

  const FolderChild = () => {
    if (!folder) return null;

    const { children } = folder;

    if (!children || !children.length) return null;

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
                  item._count ? item._count.images : 0
                }个文件`}</Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    );
  };

  const imageJSX = (images?: EagleUse.Image[]) => {
    if (!images || !images.length)
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
      <CustomImage
        image={thumbnail}
        width={0}
        height={150}
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
    );
  };

  return (
    <>
      <FolderChild />
      <Page ref={pageRef} more={{ folders: { some: { id: { in: id } } } }} />
    </>
  );
};

export default FolderPage;
