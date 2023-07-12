import { useEffect, useMemo, useState } from "react";

import "./home.css";
import Empty from "./components/Empty";
import { trpc } from "./utils/trpc";

interface SyncSubscriptionData {
  current: number;
  libraryId: number;
  type: "folder" | "image";
}

let T: NodeJS.Timer;

function Home() {
  const utils = trpc.useContext();

  const { data: config } = trpc.config.get.useQuery();
  const library = trpc.library.get.useQuery();
  const [pendingCount, setPendingCount] = useState<number>(0);
  const removeLibrary = trpc.library.delete.useMutation();
  const updateLibrary = trpc.library.update.useMutation();
  /** 解决同步过程中，隐藏控制台，在打开进度显示异常问题 */
  const pending = Number(localStorage.getItem("pending") || 0);
  // 是否在初始化中 首次添加
  const [adding, setAdding] = useState<boolean>(false);
  const checkFailAndClean = trpc.utils.checkFailAndClean.useMutation();

  window.app.getVersion().then((res) => {
    document.title = `Rao Pics - v${res}`;
  });

  // active id
  const [active, setActive] = useState<number | undefined>();
  const activeItem = useMemo(() => library.data?.find((item) => item.id === active), [library, active]);

  const webUrl = useMemo(() => (config ? `http://${config.ip}:${config.webPort}/${activeItem?.name}` : ""), [activeItem, config]);
  const openExternal = () => window.shell.openExternal(webUrl);

  const [delConfirmVisable, setDelConfirmVisable] = useState<boolean>(false);

  useEffect(() => {
    const item = library.data?.[0];
    if (!item) {
      setDelConfirmVisable(false);
      setActive(undefined);
    } else if (item && !active) {
      setActive(item.id);
    }

    window.electronAPI.createAssetsServer(library.data);
  }, [library]);

  const onRemove = () => {
    if (active) {
      removeLibrary.mutateAsync({ id: active }).then(() => {
        utils.library.get.invalidate();
      });
    }
  };

  // progress exits, sync is running
  const [progress, setProgress] = useState<SyncSubscriptionData>();
  trpc.sync.subscription.useSubscription(undefined, {
    onData(data) {
      const _data = data as SyncSubscriptionData;
      if (_data.type === "image") {
        setProgress(data as SyncSubscriptionData);
      }
    },
  });

  /** 禁止操作 */
  const disabled = useMemo(() => !!progress || adding, [progress, adding]);

  const percent = useMemo(() => {
    if (progress) {
      const { current } = progress;
      const count = pending || activeItem?._count.pendings || 0;

      if (count === 0) return 100;

      return ~~((current / count) * 100);
    }

    return 100;
  }, [activeItem, progress]);

  // sync completed.
  useEffect(() => {
    if (percent === 100 && progress && activeItem) {
      updateLibrary
        .mutateAsync({
          id: activeItem.id,
        })
        .then(() => {
          void checkFailAndClean.mutate({ libraryId: activeItem.id, libraryDir: activeItem.dir });
          utils.library.get.invalidate();
          setProgress(undefined);
          localStorage.removeItem("pending");
        });
    }
  }, [percent, progress, activeItem]);

  const sync = trpc.sync.start.useMutation();
  const onSyncClick = () => {
    if (!activeItem) return;

    localStorage.setItem("pending", activeItem._count.pendings + "");

    // start sync
    sync.mutateAsync({
      libraryId: activeItem.id,
    });
  };

  const showOpenDialog = () => {
    window.dialog
      .showOpenDialog({
        properties: ["openDirectory"],
        title: "选择文件夹/库",
      })
      .then(async (res) => {
        if (!res) return;

        const isExits = library.data?.filter((item) => item.dir === res[0]).length || 0;
        if (isExits > 0) return window.dialog.showMessageBox({ message: "此文件夹已存在", type: "error" });

        const lib = await window.electronAPI.handleDirectory(res[0]);
        if (!lib) return window.dialog.showMessageBox({ message: "暂时不支持此 App 或文件夹", type: "error" });

        T = setInterval(() => {
          utils.client.pending.getCount.query({ libraryId: lib.id }).then((count) => {
            setPendingCount(count);

            if (count === lib.count) {
              setAdding(false);
              clearInterval(T);
              utils.library.get.invalidate();
            }
          });
        }, 300);

        utils.library.get.invalidate();
        setActive(lib.id);
        setAdding(true);
      });
  };

  return (
    <div className="h-screen w-full flex text-sm">
      <div className="w-1/4 overflow-y-auto scrollbar bg-base-200/70">
        <div className="flex justify-center p-2 sticky top-0  z-10">
          <button className="btn w-full btn-outline flex items-center" disabled={disabled} onClick={showOpenDialog}>
            <svg className="w-6 fill-primary" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="979">
              <path
                id="a"
                d="M523.52 453.632l-107.2-32.256a29.888 29.888 0 0 1-20.416-37.632 30.08 30.08 0 0 1 11.712-15.552l137.152-93.952a29.76 29.76 0 0 0 13.12-24.896l-2.176-162.56A30.528 30.528 0 0 1 586.304 56.32a31.68 31.68 0 0 1 18.944 5.952l134.656 97.28a31.872 31.872 0 0 0 28.48 4.352l159.104-52.224a31.232 31.232 0 0 1 39.296 18.816 29.12 29.12 0 0 1 0 19.264l-53.952 154.048a29.248 29.248 0 0 0 4.544 27.584l100.48 130.368a29.44 29.44 0 0 1-6.336 41.984 31.68 31.68 0 0 1-18.944 5.952l-167.936-2.048a31.36 31.36 0 0 0-25.728 12.672l-96.96 132.8a31.68 31.68 0 0 1-43.264 7.168 30.08 30.08 0 0 1-11.712-15.616L615.872 547.84l-393.088 439.36a112.832 112.832 0 0 1-161.408 5.568 104.448 104.448 0 0 1 5.76-156.224L523.52 453.632zM115.648 448C51.84 448 0 397.824 0 336S51.84 224 115.648 224c63.936 0 115.712 50.176 115.712 112S179.52 448 115.648 448z m268.736-320c-36.48 0-66.112-28.672-66.112-64s29.632-64 66.112-64c36.48 0 66.112 28.672 66.112 64s-29.632 64-66.112 64z m478.208 800c-63.872 0-115.648-50.176-115.648-112S798.72 704 862.592 704c63.872 0 115.712 50.176 115.712 112s-51.84 112-115.712 112z"
                p-id="980"
              ></path>
            </svg>
            <span className="ml-2">添加文件夹/库</span>
          </button>
        </div>

        <ul className="menu px-2 rounded-box">
          {library.data?.map((item) => (
            <li key={item.id} className="w-full">
              <div
                className={`${item.id === active ? "active" : ""} capitalize flex w-full tooltip`}
                data-tip={item.name}
                onClick={() => {
                  if (disabled) return;
                  setActive(item.id);
                }}
              >
                <p className="overflow-hidden truncate flex-1 text-left">{item.name}</p>
                <img src="eagle.jpg" className="w-5 rounded-full shadow-md" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {active ? (
        <div className="flex-1 p-4">
          <div className="rounded overflow-hidden h-full shadow-md flex flex-col list">
            <div>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                  />
                </svg>

                <span className="ml-2">文件夹 ID</span>
              </span>
              <span className="font-mono">{activeItem?.id}</span>
            </div>

            <div>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                  />
                </svg>
                <span className="ml-2">文件夹路径</span>
              </span>
              <span>{activeItem?.dir}</span>
            </div>

            <div>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2">最后同步</span>
              </span>
              <span className="font-mono">{activeItem?.lastSyncTime?.toLocaleString("zh", { hour12: false }) || "未同步"}</span>
            </div>

            <div>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                  />
                </svg>

                <span className="ml-2">WEB 预览</span>
              </span>
              <a onClick={openExternal} className="btn btn-link btn-active normal-case p-0 btn-sm text-secondary font-normal">
                {webUrl}
              </a>
            </div>

            <div>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <div className="ml-2 flex items-center">
                  已同步/未同步
                  <div className="tooltip before:w-max" data-tip="未同步：已放入回收站、读取失败等素材">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-base-content/50">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </div>
                </div>
              </span>
              <span className="font-medium font-mono">
                <span className="text-success">{activeItem?._count.images}</span>
                <span className="font-extralight text-base-content/50 mx-2 relative -top-0.5">|</span>
                <span className="text-error">{activeItem?._count.fails}</span>
              </span>
            </div>

            <div className="flex-1 flex items-center justify-around !px-0">
              <div className="flex justify-center items-center w-1/2 h-full">
                <div
                  className="radial-progress text-neutral-content/70 bg-neutral border-neutral/50 border-4"
                  style={{ "--value": percent, "--size": "9rem", "--thickness": "1rem" } as React.CSSProperties}
                >
                  {adding ? (
                    <div className="flex flex-col justify-center items-center text-neutral-content">
                      <span className="text-neutral-content text-xl font-bold">{pendingCount}</span>
                      <span className="text-neutral-content/80">初始化中...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-neutral-content text-xl font-bold">{activeItem?._count.pendings}</span>
                      <span className="text-neutral-content/80">待同步</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-4 w-1/2 h-full justify-center px-8 bg-base-200/40">
                <button className="btn" disabled={disabled} onClick={onSyncClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span className="ml-2">同步</span>
                </button>

                <button className="btn btn-error btn-outline px-0" disabled={disabled}>
                  <label
                    htmlFor="my-modal"
                    className="flex items-center w-full justify-center h-full cursor-pointer"
                    onClick={() => {
                      if (disabled) return;
                      setDelConfirmVisable(true);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <span className="ml-2">移除</span>
                  </label>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Empty onAddClick={showOpenDialog} />
      )}

      {/* Modal confirm */}
      <input type="checkbox" defaultChecked={delConfirmVisable} id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-xs">
          <h3 className="font-bold text-lg">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <span className="ml-1">确认移除 ？</span>
            </span>
          </h3>
          <p className="py-4">确认移除当前文件夹/库</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-outline" onClick={() => setDelConfirmVisable(false)}>
              取消
            </label>
            <label htmlFor="my-modal" className="btn" onClick={onRemove}>
              确认
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
