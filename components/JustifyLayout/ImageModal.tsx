import { handleImageUrl } from "@/hooks";
import { Card, Divider, Modal, Space, Tag, theme } from "antd";
import Image from "next/image";

interface Props {
  image?: EagleUse.Image;
  open?: boolean;
  onCancel?: () => void;
  size?: {
    width: number;
    height: number;
  };
}

const ImageModal = ({ image, open, onCancel, size }: Props) => {
  const { token } = theme.useToken();
  if (!image) return;

  return (
    <>
      <Modal
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
          title={image.name}
          className="scroll-bar"
          headStyle={{
            position: "sticky",
            top: 0,
            backgroundColor: token.colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              width={image.width / (image.height / (size.height / 1.5))}
              height={size.height / 1.5}
              src={handleImageUrl(image, true)}
              alt=""
            />
            <Space size={[0, 8]} wrap style={{ marginTop: 20 }}>
              {image.tags.map((item) => (
                <Tag key={item.id}>{item.name}</Tag>
              ))}
            </Space>
            <Divider>基本信息</Divider>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default ImageModal;
