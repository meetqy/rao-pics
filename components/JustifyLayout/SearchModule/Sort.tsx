import { Select } from "antd";

const options = [
  { value: "modificationTime", label: "添加日期" },
  { value: "btime", label: "创建日期" },
  { value: "mtime", label: "修改日期" },
  { value: "name", label: "标题" },
  { value: "ext", label: "扩展名" },
  { value: "size", label: "文件大小" },
  { value: "dimension", label: "尺寸" },
  { value: "star", label: "评分" },
];

const Sort = () => {
  return (
    <Select
      options={options}
      size="small"
      style={{ width: 100 }}
      placeholder="排序方式"
    />
  );
};

export default Sort;
