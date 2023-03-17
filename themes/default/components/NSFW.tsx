import { useNSFW } from "@/hooks/nsfw";
import { Checkbox } from "antd";

const NSFW = () => {
  const [n, setN] = useNSFW();

  return (
    <Checkbox
      checked={n}
      onChange={(e) => {
        setN(e.target.checked);
      }}
    >
      NSFW
    </Checkbox>
  );
};

export default NSFW;
