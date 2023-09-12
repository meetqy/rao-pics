import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";
import { trpc } from "@renderer/utils/trpc";

import { PRODUCT_NAME } from "@rao-pics/constant";

const languages = {
  "zh-cn": {
    desc: `帮助你跨设备访问 Eagle、Pixcall、Billfish 的素材资源，<br/><span class="font-medium text-primary">30+</span>外观随意切换，还可以自定义主题。`,
    btn: "添加资源库",
    add_error: "添加资源库失败",
    watch_error: "读取资源失败",
  },
  "en-us": {
    desc: `Help you access the material resources of Eagle, Pixcall, Billfish <br/>across devices, <span class="font-medium text-primary">30+</span> colors can be switched at will <br/>and custom themes are supported.`,
    btn: "Add Library",
    add_error: "Failed to add library",
    watch_error: "Failed to read library",
  },
  "zh-tw": {
    desc: `幫助你跨設備訪問 Eagle、Pixcall、Billfish 的素材資源，<br/><span class="font-medium text-primary">30+</span>外觀隨意切換，還可以自定義主題。`,
    btn: "添加資源庫",
    add_error: "添加資源庫失敗",
    watch_error: "讀取資源失敗",
  },
};

const Index = () => {
  const utils = trpc.useContext();

  const { lang } = useLanguage(languages);

  const addWatchLibrary = trpc.library.watch.useMutation();

  const addLibrary = trpc.library.add.useMutation({
    onError: (err) => {
      window.dialog.showErrorBox(lang.add_error, err.message);
    },

    onSuccess({ path }) {
      addWatchLibrary.mutate(`${path}/images/**/*.json`);
      void utils.library.get.invalidate();
    },
  });

  const openDirectory = () => {
    void window.dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((res) => {
        const path = res?.[0];

        if (path) {
          addLibrary.mutate(path);
        }
      });
  };

  return (
    <Content title={<Title />}>
      <div className="flex h-full select-none flex-col items-center justify-center px-4 pb-12">
        <p className="font-serif text-7xl font-bold">
          {PRODUCT_NAME.replace(" ", ".")}
        </p>
        <p
          className="mt-2 text-center text-base text-base-content/80"
          dangerouslySetInnerHTML={{ __html: lang.desc }}
        />
        <button className="btn-primary btn mt-12 w-2/5" onClick={openDirectory}>
          {lang.btn}
        </button>
      </div>
    </Content>
  );
};

export default Index;
