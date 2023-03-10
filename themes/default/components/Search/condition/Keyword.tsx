import { Input } from "antd";
import { BooleanParam, StringParam, useQueryParams } from "use-query-params";

const Keyword = () => {
  const [keyword, setKeyword] = useQueryParams({
    k: StringParam,
    r: BooleanParam,
  });

  return (
    <Input
      value={keyword.k || undefined}
      onChange={(e) => {
        setKeyword({
          k: e.target.value || undefined,
          r: true,
        });
      }}
      size="small"
      placeholder="按名称、注释"
      style={{ width: 120 }}
      allowClear
    />
  );
};

export default Keyword;
