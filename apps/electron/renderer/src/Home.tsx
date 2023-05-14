import { useEffect, useMemo, useRef, useState } from "react";

import "./home.css";
import { trpc } from "./utils/trpc";

function Home() {
  const utils = trpc.useContext();

  const isInit = useRef<boolean>(false);

  const library = trpc.library.get.useQuery();

  const addLibrary = trpc.library.add.useMutation({
    async onSuccess() {
      await utils.library.get.invalidate();
    },
  });
  const removeLibrary = trpc.library.remove.useMutation({
    async onSuccess() {
      await utils.library.get.invalidate();
    },
  });

  const [delConfirmVisable, setDelConfirmVisable] = useState<boolean>(false);

  // active id
  const [active, setActive] = useState<string | undefined>();
  const item = useMemo(() => {
    const d = library.data?.find((item) => item.id === active);
    if (d && d.lastSyncTime) {
      d.lastSyncTime = new Date(d.lastSyncTime).toLocaleString("zh", { hour12: false });
    }

    return d;
  }, [library, active]);

  useEffect(() => {
    if (library?.data?.length && !isInit.current) {
      setActive(library.data[0].id);
      isInit.current = true;
    }
  }, [active, library]);

  const chooseFolder = async () => {
    const res = await window.electronAPI.chooseFolder();

    if (res) {
      const f = await addLibrary.mutateAsync(res);
      setActive(f.id);
    }
  };

  const onRemove = () => {
    active && removeLibrary.mutateAsync(active);
    const newL = library.data?.filter((item) => item.id != active);
    setActive(newL && newL.length > 0 ? newL[0].id : "");
    setDelConfirmVisable(false);
  };

  const sync = () => {
    if (item) {
      window.electronAPI.sync({
        ...item,
        lastSyncTime: item.lastSyncTime ? new Date(item.lastSyncTime) : null,
      });
    }
  };

  return (
    <div className="container h-screen w-full flex text-sm">
      <div className="w-1/4 overflow-y-auto scrollbar">
        <div className="flex justify-center p-2 sticky top-0  z-10">
          <button className="btn w-full btn-outline flex items-center" onClick={chooseFolder}>
            <img src="/icon.png" className="w-6" />
            <span className="ml-2">添加文件夹/库</span>
          </button>
        </div>
        <div className="h-full">
          <ul className="menu p-2 rounded-box ">
            {library.data?.map((item) => (
              <li key={item.id}>
                <a className={item.id === active ? "active" : ""} onClick={() => setActive(item.id)}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span className="ml-2">文件夹/库ID</span>
              </span>
              <span>{item?.id}</span>
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
              <span>{item?.dir}</span>
            </div>

            <div>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2">最后同步</span>
              </span>
              <span>{item?.lastSyncTime || "未同步"}</span>
            </div>

            <div>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>

                <span className="ml-2">文件</span>
              </span>
              <div className="flex space-x-4 items-center">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <span className="ml-1 text-success">0/{item?.fileCount}</span>
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                  <span className="ml-1 mr-1 text-success">0M</span>
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-around px-8 py-4">
              <div
                className="radial-progress bg-neutral text-neutral-content border-neutral border-4"
                style={{ "--value": 70, "--size": "7rem", "--thickness": "0.5rem" } as React.CSSProperties}
              >
                70%
              </div>

              <div className=" divider divider-horizontal">OR</div>

              <div className="flex flex-col space-y-4">
                <button className="btn" onClick={sync}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  <span className="ml-2">同步</span>
                </button>

                <label htmlFor="my-modal" className="btn btn-error  btn-outline" onClick={() => setDelConfirmVisable(true)}>
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
        <div className="w-3/4 flex justify-center items-center ">
          <div className="card card-compact w-4/5 bg-base-100">
            <figure>
              <img src="icon.png" alt="rao icon" className="w-1/3" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title uppercase !mb-0">
                rao.pics
                <button className="btn btn-sm btn-link hover:no-underline no-underline p-0 text-secondary normal-case relative -top-2 -left-1">v0.5.0</button>
              </h2>
              <p className="text-neutral/90 ">~~暂未添加文件夹，请点击下面按钮~~</p>
              <div className="card-actions mt-2">
                <button className="btn btn-wide btn-primary" onClick={chooseFolder}>
                  添加文件夹/库
                </button>
              </div>
            </div>
          </div>
        </div>
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
