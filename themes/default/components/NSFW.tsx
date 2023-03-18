import { useNSFW, NSFWCONSTAN } from "@/hooks/nsfw";
import { Tag, Space, Divider } from "antd";

const NSFW = () => {
  const [n = [], setN] = useNSFW();

  const options: NSFWCONSTAN[] = ["Hentai", "Porn", "Sexy"];

  return (
    <Space size={[0, 0]} split={<Divider type="vertical" />}>
      {options.map((tag) => (
        <Tag.CheckableTag
          key={tag}
          style={{ marginRight: 0 }}
          checked={n.includes(tag)}
          onChange={(checked) => {
            const nextSelectedTags = checked ? [...n, tag] : n.filter((t) => t !== tag);
            setN(nextSelectedTags);
          }}
        >
          {tag}
        </Tag.CheckableTag>
      ))}
    </Space>
  );
};

export default NSFW;
