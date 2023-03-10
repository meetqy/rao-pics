import { Input } from "antd";
import { StringParam, useQueryParam } from "use-query-params";

const Keyword = () => {
  const [keyword, setKeyword] = useQueryParam("k", StringParam);

  return (
    <Input
      value={keyword || undefined}
      onChange={(e) => setKeyword(e.target.value || undefined)}
      size="small"
      placeholder="按名称、注释"
      style={{ width: 120 }}
      allowClear
    />
  );
};

export default Keyword;
