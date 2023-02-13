import { handleImageUrl } from "@/hooks";
import { Card, Divider, Modal, Space, Tag } from "antd";
import Image from "next/image";

interface Props {
  image?: EagleUse.Image;
  open?: boolean;
  onCancel?: () => void;
}

const ImageModal = ({ image, open, onCancel }: Props) => {
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
        bodyStyle={{ height: "80vh", overflow: "hidden" }}
      >
        <Card
          type="inner"
          style={{
            textAlign: "center",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          title={image.name}
          bodyStyle={{ height: "100%", overflowY: "scroll" }}
        >
          <div>
            <div style={{ position: "relative", width: "100%", height: 400 }}>
              <Image src={handleImageUrl(image, true)} fill alt="" />
            </div>
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
