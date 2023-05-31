import { useInViewport } from "ahooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import Alert from "./Alert";
import Navbar from "./Navbar";

interface Props {
  children?: JSX.Element;
  loadMore?: () => void;
  loadMoreContent: JSX.Element | string;
  href: "/" | "/tags" | string;
}

const defaultProps: Props = {
  loadMoreContent: "加载中...",
  href: "/",
};

const Layout = (props: Props) => {
  const { children } = props;
  const loadMoreDom = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const library = router.query.library as string;

  const [isViewPort] = useInViewport(loadMoreDom, {});

  useEffect(() => {
    if (isViewPort) {
      props.loadMore?.();
    }
  }, [isViewPort]);

  const alert = () => {
    Alert.open("开发划水中，敬请期待！");
  };

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100">
        <Navbar />

        {/* children */}
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
              <Link href={`/${library}`} className="flex-0 btn btn-ghost text-4xl hover:bg-transparent capitalize font-mono">
                <span className="text-primary">rao</span>
                <span>.</span>
                <span>pics</span>
              </Link>
            </div>
          </div>

          <ul className="menu p-2 my-2">
            <li>
              <Link href={`${library}/tags`} className={props.href === "/tags" ? "active" : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                    clipRule="evenodd"
                  />
                </svg>
                标签
              </Link>
            </li>
            <li>
              <a onClick={alert}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                </svg>
                文件夹
              </a>
            </li>
            <li>
              <a onClick={alert}>
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
