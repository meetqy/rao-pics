const allTheme = {
  light: {
    colorBgContainer: "#fff",
    colorBgLayout: "#f5f5f5",
    colorBgElevated: "#fff",
  },
  dark: {
    colorBgContainer: "#141414",
    colorBgLayout: "#000000",
    colorBgElevated: "#1f1f1f",
  },
};

export const getTheme = (type: "light" | "dark") => {
  return allTheme[type];
};
