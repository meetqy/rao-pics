import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";

interface Props {
  value: string;
  onChange: (e: string) => void;
}

const options: DefaultOptionType[] = [
  { value: "jpg", label: "JPG" },
  { value: "jpeg", label: "JPEG" },
  { value: "gif", label: "GIF" },
  { value: "webp", label: "WEBP" },
  { value: "png", label: "PNG" },
  { value: "mp4", label: "MP4" },
];

const Ext = (props: Props) => {
  return (
    <Select
      placeholder="扩展名"
      allowClear
      style={{ width: 80 }}
      size="small"
      value={props.value}
      options={options}
      onChange={props.onChange}
    />
  );
};

export default Ext;
