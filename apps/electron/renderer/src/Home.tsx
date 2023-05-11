import { useMemo, useState } from "react";

import "./home.css";
import { trpc } from "./utils/trpc";

function Home() {
  const library = trpc.library.get.useQuery();
  const utils = trpc.useContext();

  const [active, setActive] = useState<string>(library.data ? library.data[0].id : "");
  const item = useMemo(() => library.data?.find((item) => item.id === active), [library, active]);

  // const addExample = trpc.example.add.useMutation({
  //   async onSuccess() {
  //     await utils.example.getAll.invalidate();
  //   },
  // });
  // const removeExample = trpc.example.remove.useMutation({
  //   async onSuccess() {
  //     await utils.example.getAll.invalidate();
  //   },
  // });
  const greeting = trpc.greeting.useQuery({ name: "Nicky" });

  return (
    <div className="container h-screen w-full flex text-sm">
      <div className="w-1/4 overflow-y-auto scrollbar">
        <div className="flex justify-center p-2 sticky top-0 bg-base-200 z-10">
          <button className="btn block w-full">添加文件夹</button>
        </div>
        <ul className="menu p-2 rounded-box">
          {library.data?.map((item) => (
            <li key={item.id}>
              <a className={item.id === active ? "active" : ""} onClick={() => setActive(item.id)}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        <div className="rounded overflow-hidden h-full shadow-md px-4 flex flex-col">
          <div className="py-3 flex justify-between items-center border-b border-dashed">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <span className="ml-2">文件夹/库 ID</span>
            </span>
            <span>{item?.id}</span>
          </div>

          <div className="py-3 flex justify-between items-center border-b border-dashed">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
              <span className="ml-2">文件夹/库 路径</span>
            </span>
            <span>{item?.dir}</span>
          </div>

          <div className="py-3 flex justify-between items-center border-b border-dashed">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-2">最后同步时间</span>
            </span>
            <span>2023-05-11 12:59:48</span>
          </div>

          <div className="py-3 flex justify-between items-center border-b border-dashed">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
              <span className="ml-2">文件数</span>
            </span>
            <div className="flex space-x-4 items-center">
              <span>总数：999</span>
              <span>已同步：999</span>
              <span>大小：12G</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-between px-8">
            <div
              className="radial-progress bg-neutral text-neutral-content border-neutral border-4"
              style={{ "--value": 70, "--size": "7rem", "--thickness": "0.5rem" } as React.CSSProperties}
            >
              70%
            </div>

            <button className="btn btn-primary btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span className="ml-2">重新加载</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
