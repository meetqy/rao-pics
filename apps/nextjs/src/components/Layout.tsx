import { useInViewport } from "ahooks";
import { useEffect, useRef } from "react";

interface Props {
  children?: JSX.Element;
  loadMore?: () => void;
  loadMoreContent: JSX.Element | string;
}

const defaultProps: Props = {
  loadMoreContent: "加载中...",
};

const Layout = (props: Props) => {
  const { children } = props;
  const loadMoreDom = useRef<HTMLDivElement>(null);

  const [isViewPort] = useInViewport(loadMoreDom, {});

  useEffect(() => {
    if (isViewPort) {
      props.loadMore?.();
    }
  }, [isViewPort]);

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100">
        <header className="w-full sticky top-0 left-0 z-20 px-4  bg-base-100">
          <nav className="navbar w-full">
            <div className="flex-1">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>

              <input type="text" placeholder="搜索" className="input focus:outline-none input-ghost h-12 normal-case" />
            </div>

            <div className="flex-none">
              <button className="btn btn-ghost m-1 capitalize">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <span className="ml-2">r.library</span>
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
                <ul tabIndex={1} className="dropdown-content menu p-2 shadow-md bg-base-200/95 rounded-box w-40 uppercase">
                  <li>
                    <a>jpg</a>
                  </li>
                  <li>
                    <a>gif</a>
                  </li>
                  <li>
                    <a>png</a>
                  </li>
                  <li>
                    <a>jpeg</a>
                  </li>
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
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-md bg-base-200/95 rounded-box w-52">
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

        <div>
          {children}
          <div className="text-center pb-4" ref={loadMoreDom}>
            {props.loadMoreContent}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-72 bg-base-200/30 text-base-content">
          <div className="sticky top-0 p-2">
            <div className="rounded-md flex px-2">
              <img src="/icon.png" draggable={false} className="h-12" />
              <a className="flex-0 btn btn-ghost text-4xl hover:bg-transparent capitalize font-mono">
                <span className="text-primary">rao</span>
                <span>.</span>
                <span>pics</span>
              </a>
            </div>
          </div>

          <ul className="menu p-2 my-2">
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                    clipRule="evenodd"
                  />
                </svg>
                标签
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                </svg>
                文件夹
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                  <path
                    fillRule="evenodd"
                    d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                日历
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;
