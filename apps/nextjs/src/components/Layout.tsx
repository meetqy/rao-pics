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
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
        {children}
        <div className="text-center pb-4" ref={loadMoreDom}>
          {props.loadMoreContent}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="w-72 bg-base-200 text-base-content">
          <div className="sticky top-0 p-2">
            <div className=" bg-base-300 rounded-md shadow">
              <a href="" className="flex-0 btn btn-ghost px-4 text-lg">
                <span className=" text-primary">rao</span>.<span>pics</span>
              </a>
              <a href="" className="link link-hover font-mono text-xs text-opacity-50 relative -top-2">
                <div data-tip="Changelog" className="tooltip tooltip-bottom">
                  0.5.0
                </div>
              </a>
            </div>
          </div>

          <div className="p-2">
            <button className="btn btn-block btn-primary btn-outline capitalize justify-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                <path
                  fillRule="evenodd"
                  d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z"
                  clipRule="evenodd"
                />
                <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
              </svg>
              r.library
            </button>
          </div>

          <ul className="menu p-2 border-b border-base-300">
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
