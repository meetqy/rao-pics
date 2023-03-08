import { tagsState } from "@/store";
import { Select } from "antd";
import { useState } from "react";
import { useRecoilValue } from "recoil";
interface Props {
  value: string[];
  onChange?: (value: EagleUse.SearchParams["tags"]) => void;
}

const Tag = (props: Props) => {
  const tags = useRecoilValue(tagsState);
  const [value, setValue] = useState<string[]>(props.value || []);

  const onChange = (value: string[]) => {
    setValue(value);
    props.onChange(value);
  };

  return (
    <Select
      size="small"
      mode="tags"
      allowClear
      placeholder="标签"
      value={value}
      style={{ minWidth: 120 }}
      options={tags.map((item) => ({
        label: item.id,
        value: item.id,
      }))}
      maxTagCount={1}
      onClear={() => onChange([])}
      onChange={(e) => onChange(e)}
    />
  );
};

export default Tag;
