import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";

interface Props {
  value: string;
  onChange: (e: string) => void;
}

const options: DefaultOptionType[] = [
  { value: "jpg", label: "jpg" },
  { value: "jpeg", label: "jpeg" },
  { value: "gif", label: "gif" },
  { value: "webp", label: "webp" },
  { value: "png", label: "png" },
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
