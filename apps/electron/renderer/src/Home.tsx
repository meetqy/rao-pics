import { useEffect, useMemo, useRef, useState } from "react";

import "./home.css";
import { EagleEmitOption } from "@acme/eagle";

import Alert from "./components/Alert";
import Empty from "./components/Empty";
import { trpc } from "./utils/trpc";

function Home() {
  const utils = trpc.useContext();
  const isInit = useRef<boolean>(false);

  const { data: config } = trpc.config.get.useQuery();

  const library = trpc.library.get.useQuery();
  const addLibrary = trpc.library.add.useMutation({
    onSuccess() {
      utils.library.get.invalidate();
    },
  });

  // active id
  const [active, setActive] = useState<number | undefined>();
  const activeItem = useMemo(() => library.data?.find((item) => item.id === active), [library, active]);
  // 刷新获取进度
  useEffect(() => {
    if (activeItem) {
      const { _count, failCount, fileCount } = activeItem;
      setEagleSyncProgress({
        type: "image",
        current: _count.images + (failCount || 0),
        failCount: failCount || 0,
        count: fileCount || 0,
      });
    }
  }, [active]);

  const removeLibrary = trpc.library.remove.useMutation({
    onSuccess() {
      utils.library.get.invalidate();
    },
  });
  const updateLibrary = trpc.library.update.useMutation();
  const [delConfirmVisable, setDelConfirmVisable] = useState<boolean>(false);

  useEffect(() => {
    if (library?.data?.length && !isInit.current) {
      setActive(library.data[0].id);
      isInit.current = true;
    }

    library.data && window.electronAPI.library.assetsServer(library.data);
  }, [active, library]);

  const onRemove = () => {
    active && removeLibrary.mutateAsync(active);
    const newL = library.data?.filter((item) => item.id != active);
    setActive(newL && newL.length > 0 ? newL[0].id : undefined);
    setDelConfirmVisable(false);
  };

  // 同步进度
  const [eagleSyncProgress, setEagleSyncProgress] = useState<EagleEmitOption>();
  const percent = useMemo(() => {
    if (eagleSyncProgress) {
      const { current, count } = eagleSyncProgress;

      return ~~((current / count) * 100);
    }

    return 0;
  }, [eagleSyncProgress]);
  const syncing = useMemo(() => percent > 0 && percent < 100, [percent]);

  const syncOnClick = () => {
    if (!activeItem) return;

    updateLibrary.mutateAsync(
      { id: activeItem.id },
      {
        onSuccess: async () => {
          if (activeItem) {
            window.electronAPI.sync({
              ...activeItem,
              lastSyncTime: null,
            });

            if (activeItem.type === "eagle") {
              window.electronAPI.onEagleSyncProgress((progress) => {
                if (progress.type === "image") {
                  setEagleSyncProgress(progress);

                  // 同步完成 结果更新到数据库
                  if (progress.current === progress.count) {
                    updateLibrary.mutateAsync({
                      id: activeItem.id,
                      fileCount: progress.count,
                      failCount: progress.failCount,
                    });
                  }
                }
              });
            }
          }

          await utils.library.get.invalidate();
        },
      },
    );
  };

  const webUrl = useMemo(() => (config ? `http://${config.ip}:${config.webPort}/${activeItem?.name}` : ""), [activeItem, config]);
  const openExternal = () => window.shell.openExternal(webUrl);

  const showOpenDialog = () => {
    window.dialog
      .showOpenDialog({
        properties: ["openDirectory"],
        title: "选择文件夹/库",
      })
      .then(async (res) => {
        if (!res) return;

        const lib = await window.electronAPI.handleDirectory(res[0]);
        if (!lib) return Alert({ title: "暂时不支持此App/文件夹" });

        if (lib) {
          const libRes = await addLibrary.mutateAsync(lib);
          setActive(libRes.id);
        }
      });
  };

  return (
    <div className="h-screen w-full flex text-sm">
      <div className="w-1/4 overflow-y-auto scrollbar bg-base-200/70">
        <div className="flex justify-center p-2 sticky top-0  z-10">
          <button className="btn w-full btn-outline flex items-center" onClick={showOpenDialog}>
            <img src="icon.png" className="w-6" />
            <span className="ml-2">添加文件夹/库</span>
          </button>
        </div>

        <ul className="menu px-2 rounded-box">
          {library.data?.map((item) => (
            <li key={item.id} className="w-full">
              <div className={`${item.id === active ? "active" : ""} capitalize flex w-full tooltip`} data-tip={item.name} onClick={() => setActive(item.id)}>
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

                <span className="ml-2">文件夹/库ID</span>
              </span>
              <span>{activeItem?.id}</span>
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
                <span className="ml-2">文件夹/库路径</span>
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
              <span>{activeItem?.lastSyncTime?.toLocaleString("zh", { hour12: false }) || "未同步"}</span>
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

            <div className="flex-1 flex items-center justify-around px-8 py-4">
              <div className="flex flex-col justify-center items-center">
                <div
                  className="radial-progress text-center text-neutral-content/70 bg-neutral border-neutral border-4"
                  style={{ "--value": percent, "--size": "7rem", "--thickness": "0.5rem" } as React.CSSProperties}
                >
                  <span className="text-lg font-bold text-neutral-content">{percent}%</span>
                  <span className="text-neutral-content/80 text-xs">已同步</span>
                </div>

                <span className="mt-4 flex items-end">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-info">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                    />
                  </svg>

                  <span className="font-medium relative top-0.5">{activeItem?.fileCount}</span>
                </span>
              </div>

              <div className=" divider divider-horizontal">OR</div>

              <div className="flex flex-col space-y-4">
                <button className="btn" disabled={syncing} onClick={syncOnClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span className="ml-2">同步</span>
                </button>

                <label htmlFor="my-modal" className={`btn btn-error btn-outline ${syncing ? "btn-disabled" : ""}`} onClick={() => setDelConfirmVisable(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className="ml-2">移除</span>
                </label>
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
