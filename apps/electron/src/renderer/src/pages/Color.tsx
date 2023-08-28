import { useState } from "react";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/title";
import { useColor, useLanguage } from "@renderer/hooks";

interface ItemProps {
  active?: boolean;
  color: string;
  onClick?: () => void;
}

const Item = ({ color, onClick, active = false }: ItemProps) => {
  return (
    <div
      className={`overflow-hidden rounded border border-base-content/20 hover:border-base-content/40 ${
        active ? "outline outline-2" : ""
      }`}
      data-set-theme={color}
      onClick={onClick}
      aria-hidden
    >
      <div
        data-theme={color}
        className="w-full cursor-pointer bg-base-100 text-base-content"
      >
        <div className="grid grid-cols-3 grid-rows-3">
          <div className="col-start-1 row-span-2 row-start-2 bg-base-200"></div>
          <div className="col-start-1 row-start-2 bg-base-300"></div>
          <div className="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 bg-base-100 p-2">
            <div className="font-bold capitalize">{color}</div>

            <div className="flex flex-wrap gap-1">
              <div className="flex aspect-square w-5 items-center justify-center rounded bg-primary lg:w-6">
                <div className="text-sm font-bold text-primary-content">A</div>
              </div>
              <div className="flex aspect-square w-5 items-center justify-center rounded bg-secondary lg:w-6">
                <div className="text-sm font-bold text-secondary-content">
                  B
                </div>
              </div>
              <div className="flex aspect-square w-5 items-center justify-center rounded bg-accent lg:w-6">
                <div className="text-sm font-bold text-accent-content">C</div>
              </div>
              <div className="flex aspect-square w-5 items-center justify-center rounded bg-neutral lg:w-6">
                <div className="text-sm font-bold text-neutral-content">D</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const colorScheme = [
  ["light", "light,angle"],
  ["dark", "dark,angle"],
  ["cupcake", "light,angle"],
  ["bumblebee", "light,angle"],
  ["emerald", "light,angle"],
  ["corporate", "light,right-angle"],
  ["synthwave", "dark,angle"],
  ["retro", "light,angle"],
  ["cyberpunk", "neutral,right-angle"],
  ["valentine", "neutral,angle"],
  ["halloween", "dark,angle"],
  ["garden", "light,angle"],
  ["forest", "dark,angle"],
  ["aqua", "neutral,angle"],
  ["lofi", "light,right-angle"],
  ["pastel", "light,angle"],
  ["fantasy", "light,angle"],
  ["wireframe", "light,right-angle"],
  ["black", "dark,right-angle"],
  ["luxury", "dark,angle"],
  ["dracula", "dark,angle"],
  ["cmyk", "light,angle"],
  ["autumn", "light,angle"],
  ["business", "dark,right-angle"],
  ["acid", "light,angle"],
  ["lemonade", "light,angle"],
  ["night", "dark,angle"],
  ["coffee", "dark,angle"],
  ["winter", "light,angle"],
];

const languages = {
  "zh-cn": {
    title: "外观",
    tags: ["全部", "浅色", "深色", "圆角", "直角", "中性"],
  },
  "zh-tw": {
    title: "外觀",
    tags: ["全部", "淺色", "深色", "圓角", "直角", "中性"],
  },
  "en-us": {
    title: "Color Scheme",
    tags: ["All", "Light", "Dark", "Angle", "Right Angle", "Neutral"],
  },
};

const ColorPage = () => {
  const { lang } = useLanguage(languages);

  const tags = [
    { name: "", text: lang.tags[0] },
    { name: "light", text: lang.tags[1] },
    { name: "dark", text: lang.tags[2] },
    { name: "angle", text: lang.tags[3] },
    { name: "right-angle", text: lang.tags[4] },
    { name: "neutral", text: lang.tags[5] },
  ];

  const { color, setColor } = useColor();

  const [tag, setTag] = useState("");

  const filterColors = colorScheme.filter((t) => t[1]?.includes(tag));

  return (
    <Content title={<Title>{lang.title}</Title>}>
      <div className="pb-4">
        <div className="sticky left-0 top-0 z-10 px-4">
          <div className="card-wrapper">
            <div className="join py-2">
              {tags.map((item) => (
                <input
                  key={item.name}
                  className="btn-sm join-item btn"
                  type="radio"
                  name="options"
                  checked={item.name === tag}
                  onChange={() => setTag(item.name)}
                  aria-label={item.text}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 px-4">
          {filterColors.map((t) => (
            <Item
              key={t[0]}
              color={t[0] ?? "light"}
              onClick={() => setColor(t[0] ?? "light")}
              active={color === t[0]}
            />
          ))}
        </div>
      </div>
    </Content>
  );
};

export default ColorPage;
