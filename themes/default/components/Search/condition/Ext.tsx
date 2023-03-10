import { Select } from "antd";
import { BooleanParam, StringParam, useQueryParams } from "use-query-params";

const supportExt = ["jpg", "jpeg", "png", "bmp", "mp4", "gif"];

const Ext = () => {
  const [exts, setExt] = useQueryParams({
    ext: StringParam,
    r: BooleanParam,
  });

  return (
    <Select
      value={exts.ext || undefined}
      onChange={(e) => {
        setExt({
          ext: e,
          r: true,
        });
      }}
      size="small"
      style={{ width: 80 }}
      placeholder="扩展名"
      allowClear
    >
      {supportExt.map((item) => (
        <Select.Option key={item}>{item.toLocaleUpperCase()}</Select.Option>
      ))}
    </Select>
  );
};

export default Ext;
