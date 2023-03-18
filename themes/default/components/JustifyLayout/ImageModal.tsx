import { handleImageUrl, handleTime, transformByteToUnit } from "@/utils";
import { Card, Col, Divider, Modal, Row, Space, Tag, Typography, theme } from "antd";
import CustomImage from "../CustomImage";

interface Props {
  image?: EagleUse.Image;
  open?: boolean;
  onCancel?: () => void;
}

const ImageModal = ({ image, open, onCancel }: Props) => {
  const { token } = theme.useToken();
  if (!image) return <></>;

  return (
    <>
      <style jsx global>
        {`
          .image-modal .ant-modal-content {
            padding: 0;
            overflow: hidden;
          }
        `}
      </style>
      <Modal
        className="image-modal"
        open={open}
        title={null}
        footer={null}
        width={"85%"}
        onCancel={onCancel}
        centered
        bodyStyle={{ height: "90vh", overflow: "hidden" }}
      >
        <Card
          style={{
            textAlign: "center",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
          title={
            <Row>
              <Col>
                <Typography.Text strong>{image.name}</Typography.Text>
              </Col>
              <Col offset={1}>
                <Tag color="red-inverse">{image.ext.toLocaleUpperCase()}</Tag>
                <Tag color="volcano-inverse">{transformByteToUnit(image.size)}</Tag>
                <Tag color="orange-inverse">
                  {image.width} x {image.height}
                </Tag>
              </Col>
            </Row>
          }
          className="scroll-bar"
          headStyle={{
            position: "sticky",
            top: 0,
            backgroundColor: token.colorBgContainer,
            zIndex: 99,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "65vh",
              }}
            >
              {["mp4"].includes(image.ext.toLocaleLowerCase()) ? (
                <video src={handleImageUrl(image, true)} style={{ width: "100%", height: "100%" }} controls />
              ) : (
                <CustomImage fill style={{ objectFit: "scale-down" }} image={image} />
              )}
            </div>

            <div>
              {image.tags && (
                <div style={{ width: "100%" }}>
                  <Divider orientation="left">标签</Divider>
                  <Space size={[0, 8]} style={{ width: "100%" }}>
                    {image.tags.map((item) => (
                      <Tag key={item.id}>{item.name}</Tag>
                    ))}
                  </Space>
                </div>
              )}
            </div>

            <Divider orientation="left">日期</Divider>
            <Space size={[0, 8]} style={{ width: "100%" }}>
              <Tag color="blue">添加日期：{handleTime(image.mtime)}</Tag>
              <Tag color="blue">创建日期：{handleTime(image.btime)}</Tag>
              <Tag color="blue">
                修改日期：{image.lastModified ? handleTime(image.lastModified) : "0000-00-00"}
              </Tag>
            </Space>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default ImageModal;
