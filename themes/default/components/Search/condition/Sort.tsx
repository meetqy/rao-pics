import { Select, Space, Switch } from "antd";
import { useMemo } from "react";
import { ArrayParam, BooleanParam, useQueryParams, withDefault } from "use-query-params";

const options = [
  { value: "modificationTime", label: "添加日期" },
  { value: "btime", label: "创建日期" },
  { value: "mtime", label: "修改日期" },
  { value: "name", label: "标题" },
  { value: "ext", label: "扩展名" },
  { value: "size", label: "文件大小" },
  { value: "star", label: "评分" },
];

const Sort = () => {
  const [sort, setSort] = useQueryParams({
    // [字段, desc|asc]
    s: withDefault(ArrayParam, ["modificationTime", "desc"]),
    r: BooleanParam,
  });

  const s = useMemo(() => sort.s || [], [sort]);

  return (
    <Space>
      <Select
        size="small"
        style={{ width: 100 }}
        options={options}
        value={s[0] || undefined}
        onChange={(e) => {
          s[0] = e;
          setSort({
            r: true,
            s,
          });
        }}
      />

      <Switch
        checkedChildren="降序"
        unCheckedChildren="升序"
        checked={s[1] === "desc"}
        onChange={(e) => {
          s[1] = e ? "desc" : "asc";

          setSort({
            s,
            r: true,
          });
        }}
      />
    </Space>
  );
};

export default Sort;
