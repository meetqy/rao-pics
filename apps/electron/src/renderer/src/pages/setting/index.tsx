import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";

import { LANGUAGE } from "@rao-pics/constant";

const languages = {
  "zh-cn": {
    title: "通用",
    language_title: "语言",
    language_desc: "选择语言",
  },
  "en-us": {
    title: "General",
    language_title: "Language",
    language_desc: "Select language",
  },
  "zh-tw": {
    title: "通用",
    language_title: "語言",
    language_desc: "選擇語言",
  },
};

const SettingPage = () => {
  const { lang, language, setLanguage } =
    useLanguage<typeof languages>(languages);

  const items = Object.keys(LANGUAGE).map((item) => ({
    text: LANGUAGE[item] as keyof typeof LANGUAGE,
    value: item,
  }));

  return (
    <Content title={<Title>{lang.title}</Title>}>
      <div className="px-4">
        <div className="card-wrapper">
          <div className="card-row">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                />
              </svg>
              <span className="ml-2">{lang.language_title}</span>
            </div>

            <div>
              <select
                onChange={(e) => {
                  const value = e.target.value as keyof typeof languages;

                  if (value) {
                    setLanguage(value);
                  }
                }}
                value={language}
                className="select select-xs w-full bg-transparent text-right text-sm font-normal focus:outline-none"
              >
                {items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default SettingPage;
