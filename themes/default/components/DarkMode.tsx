import { useTheme } from "@/hooks";
import { Switch } from "antd";

const DarkMode = () => {
  const [mode, setMode] = useTheme();

  return (
    <Switch
      checked={mode === "dark"}
      checkedChildren={"🌛"}
      unCheckedChildren={"☀️"}
      onChange={(e) => setMode(e ? "dark" : "light")}
    />
  );
};

export default DarkMode;
