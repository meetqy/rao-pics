import { Select, Switch } from "antd";
import { useState } from "react";

const options = [
  { value: "modificationTime", label: "添加日期" },
  { value: "btime", label: "创建日期" },
  { value: "mtime", label: "修改日期" },
  { value: "name", label: "标题" },
  { value: "ext", label: "扩展名" },
  { value: "size", label: "文件大小" },
  // { value: "dimension", label: "尺寸" },
  { value: "star", label: "评分" },
];

interface Props {
  onChange?: (e: EagleUse.SearchParams["orderBy"]) => void;
}

export const SortRule = (props: Props) => {
  const [orderBy, setOrderBy] = useState<EagleUse.SearchParams["orderBy"]>({
    field: "modificationTime",
    by: "desc",
  });

  return (
    <Select
      options={options}
      size="small"
      style={{ width: 100 }}
      placeholder="排序方式"
      value={orderBy.field}
      onChange={(e) => {
        orderBy.field = e;
        setOrderBy(orderBy);
        props.onChange({ ...orderBy });
      }}
    />
  );
};

export const Sort = (props: Props) => {
  const [orderBy, setOrderBy] = useState<EagleUse.SearchParams["orderBy"]>({
    field: "modificationTime",
    by: "desc",
  });

  return (
    <Switch
      checkedChildren="升序"
      unCheckedChildren="降序"
      defaultChecked
      checked={orderBy.by === "asc"}
      onChange={(e) => {
        orderBy.by = e ? "asc" : "desc";
        setOrderBy(orderBy);
        props.onChange({ ...orderBy });
      }}
    />
  );
};
