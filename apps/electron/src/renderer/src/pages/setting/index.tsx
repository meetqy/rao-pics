import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  DevicePhoneMobileIcon,
  FolderMinusIcon,
  LanguageIcon,
  LinkIcon,
  ServerIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";
import { useLanguage, useSite } from "@renderer/hooks";

import { LANGUAGE } from "@rao-pics/constant";
import { trpc } from "@rao-pics/trpc";

import "./index.css";

import Row from "@renderer/components/Row";

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
    autoSync: "自动同步",
    site: "自定义域名",
    webPort: "网页端口",
    serverPort: "服务端口",
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
    autoSync: "Auto Sync",
    site: "Custom Domain",
    webPort: "Web Port",
    serverPort: "Server Port",
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
    autoSync: "自動同步",
    site: "自定義域名",
    webPort: "網頁端口",
    serverPort: "服務端口",
  },
};

const SettingPage = () => {
  const utils = trpc.useUtils();

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

  const site = useSite();

  return (
    <Content title={<Title>{lang.title}</Title>}>
      <div className="px-4 pb-4">
        {/* 语言 */}
        <div className="card-wrapper">
          <Row
            left={
              <>
                <LanguageIcon className="h-5 w-5" />
                <span className="ml-2">{lang.language_title}</span>
              </>
            }
            right={
              <select
                onChange={(e) => {
                  const value = e.target.value as keyof typeof languages;

                  if (value) {
                    setLanguage(value);
                  }
                }}
                value={language}
                className="custom-select w-auto"
              >
                {items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            }
          />
        </div>

        {/* 显示相关 */}
        <div className="card-wrapper mt-4">
          <Row
            left={
              <>
                <TrashIcon className="h-5 w-5" />
                <span className="ml-2">{lang.trash}</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
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
            }
          />

          <Row
            left={
              <>
                <FolderMinusIcon className="h-5 w-5" />
                <span className="ml-2">{lang.pwd_folder}</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
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
            }
          />
        </div>

        {/* 同步相关 */}
        <div className="card-wrapper mt-4">
          <Row
            left={
              <>
                <ArrowsRightLeftIcon className="h-5 w-5" />
                <span className="ml-2">{lang.startDiffLibrary}</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
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
            }
          />
          <Row
            left={
              <>
                <ArrowPathIcon className="h-5 w-5" />
                <span className="ml-2">{lang.autoSync}</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
                value={config?.autoSync ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    autoSync: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>{lang.close}</option>
                <option value={1}>{lang.open}</option>
              </select>
            }
          />
        </div>

        {/* 自定义域名 */}
        <div className="card-wrapper mt-4">
          <Row
            left={
              <>
                <LinkIcon className="h-5 w-5" />
                <span className="ml-2 flex items-center">{lang.site}</span>
              </>
            }
            right={
              <input
                defaultValue={site}
                onBlur={(e) => {
                  configUpsert.mutate({
                    clientSite: e.target.value,
                  });
                }}
                className="input-ghost input input-sm w-full !pr-0 text-right font-mono transition-all focus:!pr-4 focus:outline-none"
                placeholder="eg: https://desktop.rao.pics"
              />
            }
          />

          <Row
            left={
              <>
                <DevicePhoneMobileIcon className="h-5 w-5" />
                <span className="ml-2 flex items-center">{lang.webPort}</span>
              </>
            }
            right={config?.clientPort}
          />

          <Row
            left={
              <>
                <ServerIcon className="h-5 w-5" />
                <span className="ml-2 flex items-center">
                  {lang.serverPort}
                </span>
              </>
            }
            right={config?.serverPort}
          />
        </div>
      </div>
    </Content>
  );
};

export default SettingPage;
