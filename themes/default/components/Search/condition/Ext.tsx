import { Select } from "antd";
import { StringParam, useQueryParam } from "use-query-params";

const supportExt = ["jpg", "jpeg", "png", "bmp", "mp4", "gif"];

const Ext = () => {
  const [ext, setExt] = useQueryParam("ext", StringParam);

  return (
    <Select
      value={ext}
      onChange={(e) => setExt(e || undefined)}
      size="small"
      style={{ width: 80 }}
      placeholder="扩展名"
    >
      {supportExt.map((item) => (
        <Select.Option key={item}>{item.toLocaleUpperCase()}</Select.Option>
      ))}
    </Select>
  );
};

export default Ext;
