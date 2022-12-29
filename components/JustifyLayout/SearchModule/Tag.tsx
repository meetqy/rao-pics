import { tagsState } from "@/store";
import { Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface Props {
  onChange?: (value: EagleUse.SearchParams["tags"]) => void;
}

const Tag = (props: Props) => {
  const tags = useRecoilValue(tagsState);
  const router = useRouter();
  const tag = router.query.tag as string;
  const [value, setValue] = useState<string[]>(tag ? [tag] : []);

  useEffect(() => {
    props?.onChange(value);
  }, [value]);

  return (
    <Select
      size="small"
      mode="tags"
      allowClear
      placeholder="按标签筛选"
      value={value}
      style={{ minWidth: 120 }}
      options={tags.map((item) => ({
        label: item.id,
        value: item.id,
      }))}
      maxTagCount={1}
      onClear={() => setValue([])}
      onChange={(e) => setValue(e)}
    />
  );
};

export default Tag;
