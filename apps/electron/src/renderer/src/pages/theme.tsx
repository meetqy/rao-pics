const Item = ({ theme }: { theme: string }) => {
  return (
    <div
      className="overflow-hidden rounded border border-base-content/20 outline outline-2 outline-offset-2 outline-transparent hover:border-base-content/40"
      data-set-theme={theme}
      data-act-class="!outline-base-content"
    >
      <div
        data-theme={theme}
        className="w-full cursor-pointer bg-base-100 text-base-content"
      >
        <div className="grid grid-cols-3 grid-rows-3">
          <div className="col-start-1 row-span-2 row-start-2 bg-base-200"></div>
          <div className="col-start-1 row-start-2 bg-base-300"></div>
          <div className="col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 bg-base-100 p-2">
            <div className="font-bold capitalize">{theme}</div>

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

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const ThemePage = () => {
  return (
    <div className="px-4 pb-4">
      <div className="card-wrapper">
        <div className="join py-2">
          <input
            className="btn-primary btn-sm join-item btn"
            type="radio"
            name="options"
            aria-label="全部"
          />
          <input
            className="btn-sm join-item btn"
            type="radio"
            name="options"
            aria-label="深色"
          />
          <input
            className="btn-sm join-item btn"
            type="radio"
            name="options"
            aria-label="浅色"
          />
          <input
            className="btn-sm join-item btn"
            type="radio"
            name="options"
            aria-label="直角"
          />
          <input
            className="btn-sm join-item btn"
            type="radio"
            name="options"
            aria-label="圆角"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {themes.map((theme) => (
          <Item key={theme} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default ThemePage;
