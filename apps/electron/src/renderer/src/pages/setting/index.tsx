import {
  ArrowsRightLeftIcon,
  FolderMinusIcon,
  // FolderMinusIcon,
  LanguageIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";
import { trpc } from "@renderer/utils/trpc";

import { LANGUAGE } from "@rao-pics/constant";

import "./index.css";

const languages = {
  "zh-cn": {
    title: "通用",
    language_title: "语言",
    language_desc: "选择语言",
    trash: "回收站",
    startDiffLibrary: "启动时对比资源库",
    pwd_folder: "加密文件夹",
    show: "显示",
    hide: "不显示",
    open: "开启",
    close: "关闭",
  },
  "en-us": {
    title: "General",
    language_title: "Language",
    language_desc: "Select language",
    trash: "Trash",
    startDiffLibrary: "Diff library at startup",
    pwd_folder: "Password Folder",
    show: "Show",
    hide: "Hide",
    open: "Open",
    close: "Close",
  },
  "zh-tw": {
    title: "通用",
    language_title: "語言",
    language_desc: "選擇語言",
    trash: "回收站",
    startDiffLibrary: "啟動時對比資源庫",
    pwd_folder: "加密文件夾",
    show: "顯示",
    hide: "不顯示",
    open: "開啟",
    close: "關閉",
  },
};

const SettingPage = () => {
  const utils = trpc.useContext();

  const configUpsert = trpc.config.upsert.useMutation({
    onSuccess() {
      void utils.config.invalidate();
    },
  });

  const { data: config } = trpc.config.findUnique.useQuery();

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

        {/* 显示相关 */}
        <div className="card-wrapper mt-4">
          <div className="card-row">
            <div>
              <TrashIcon className="h-5 w-5" />

              <span className="ml-2">{lang.trash}</span>
            </div>

            <div>
              <select
                className="custom-select"
                value={config?.trash ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    trash: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>{lang.hide}</option>
                <option value={1}>{lang.show}</option>
              </select>
            </div>
          </div>

          <div className="card-row">
            <div>
              <FolderMinusIcon className="h-5 w-5" />
              <span className="ml-2">{lang.pwd_folder}</span>
            </div>

            <div>
              <select
                className="custom-select"
                value={config?.pwdFolder ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    pwdFolder: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>{lang.hide}</option>
                <option value={1}>{lang.show}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-wrapper mt-4">
          <div className="card-row">
            <div>
              <ArrowsRightLeftIcon className="h-5 w-5" />

              <span className="ml-2">{lang.startDiffLibrary}</span>
            </div>

            <div>
              <select
                className="custom-select"
                value={config?.startDiffLibrary ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    startDiffLibrary: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>{lang.close}</option>
                <option value={1}>{lang.open}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default SettingPage;
