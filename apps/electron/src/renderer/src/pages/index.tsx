import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";

import { PRODUCT_NAME } from "@rao-pics/constant";
import { trpc } from "@rao-pics/trpc";

const Index = () => {
  const utils = trpc.useUtils();

  const addWatchLibrary = trpc.library.watch.useMutation();

  const addLibrary = trpc.library.add.useMutation({
    onError: (err) => {
      window.dialog.showErrorBox("添加资源库失败", err.message);
    },

    onSuccess({ path }) {
      addWatchLibrary.mutate({ path });
      void utils.library.findUnique.invalidate();
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
          dangerouslySetInnerHTML={{
            __html: `帮助你远程访问 Eagle 的素材资源，<br/><span class="font-medium text-primary">30+</span>外观随意切换，还可以自定义主题。`,
          }}
        />
        <button className="btn-primary btn mt-12 w-2/5" onClick={openDirectory}>
          添加资源库
        </button>
      </div>
    </Content>
  );
};

export default Index;
