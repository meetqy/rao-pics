import { tagsState } from "@/store";
import { Select } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
interface Props {
  value: string[];
  onChange?: (value: EagleUse.SearchParams["tags"]) => void;
}

const Tag = (props: Props) => {
  const tags = useRecoilValue(tagsState);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    if (_.isEqual(props.value, value)) return;
    setValue(props.value);
  }, [props.value, value]);

  const onChange = (value: string[]) => {
    setValue(value);
    props.onChange(value);
  };

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
      onClear={() => onChange([])}
      onChange={(e) => onChange(e)}
    />
  );
};

export default Tag;
