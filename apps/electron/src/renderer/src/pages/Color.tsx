import { useState } from "react";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/title";
import { colorState } from "@renderer/state";
import { useRecoilState } from "recoil";

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

const tags = [
  { name: "", text: "全部" },
  { name: "light", text: "浅色" },
  { name: "dark", text: "深色" },
  { name: "angle", text: "圆角" },
  { name: "right-angle", text: "直角" },
  { name: "neutral", text: "中性" },
];

const ColorPage = () => {
  const [color, setColor] = useRecoilState(colorState);

  const [tag, setTag] = useState("");

  const filterColors = colorScheme.filter((t) => t[1]?.includes(tag));

  return (
    <Content title={<Title>外观</Title>}>
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
