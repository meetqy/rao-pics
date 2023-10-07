import {
  FolderMinusIcon,
  LanguageIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";

import "./index.css";

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
              <TrashIcon className="h-5 w-5" />

              <span className="ml-2">回收站素材</span>
            </div>

            <div>
              <select className="custom-select">
                <option>不显示</option>
                <option>显示</option>
              </select>
            </div>
          </div>

          <div className="card-row">
            <div>
              <FolderMinusIcon className="h-5 w-5" />
              <span className="ml-2">加密文件夹素材</span>
            </div>

            <div>
              <select className="custom-select">
                <option>不显示</option>
                <option>显示</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-wrapper mt-4">
          <div className="card-row">
            <div>
              <LanguageIcon className="h-5 w-5" />
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
                className="custom-select"
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
