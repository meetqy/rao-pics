import { useRouter } from "next/router";
import { useMemo } from "react";

import { type ExtEnum } from "@acme/api";

const Navbar = () => {
  const { query } = useRouter();
  const libraryName = useMemo(() => query.library as string, [query]);

  const ext = useMemo(() => query.ext?.toString().toLocaleLowerCase() as ExtEnum, [query]);

  const extOptions: ExtEnum[] = ["bmp", "gif", "jpg", "png"];

  return (
    <header className="w-full sticky top-0 left-0 z-20 px-4 bg-base-100/90 backdrop-blur">
      <nav className="navbar w-full">
        <div className="flex-1">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input type="text" placeholder="搜索" className="input focus:outline-none input-ghost h-12 normal-case" />
        </div>

        <div className="flex-none">
          <button className="btn btn-ghost m-1 capitalize font-mono">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span className="ml-2">{libraryName}</span>
          </button>

          <div className="dropdown dropdown-end">
            <label tabIndex={1} className="btn m-1 btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
            </label>
            <ul tabIndex={1} className="dropdown-content menu p-2 shadow-md bg-base-200/90 backdrop-blur rounded-box w-40 uppercase">
              {extOptions.map((item) => (
                <li key={item}>
                  <a className={item === ext ? "active" : ""}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-md bg-base-200/90 backdrop-blur rounded-box w-52">
              <li>
                <a>按添加时间</a>
              </li>
              <li>
                <a>按修改时间</a>
              </li>
              <li>
                <a>文件大小</a>
              </li>
              <li>
                <a>文件名称</a>
              </li>
            </ul>
          </div>

          <button className="btn btn-ghost btn-square btn-circle hover:bg-transparent">
            <input name="test" type="checkbox" className="toggle toggle-primary toggle-sm -rotate-90" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
