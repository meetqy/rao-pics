import { Input } from "antd";
import { useRef } from "react";
import { BooleanParam, StringParam, useQueryParams } from "use-query-params";

const Keyword = () => {
  const [keyword, setKeyword] = useQueryParams({
    k: StringParam,
    r: BooleanParam,
  });

  const isChange = useRef(false);

  return (
    <Input
      value={keyword.k || undefined}
      onChange={(e) => {
        isChange.current = true;
        setKeyword({
          ...keyword,
          k: e.target.value || undefined,
        });
      }}
      onBlur={() => {
        if (isChange.current) {
          setKeyword({
            ...keyword,
            r: true,
          });
        }
      }}
      size="small"
      placeholder="按名称、注释"
      style={{ width: 120 }}
      allowClear
    />
  );
};

export default Keyword;
