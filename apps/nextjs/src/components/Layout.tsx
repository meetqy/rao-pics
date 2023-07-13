import { useInViewport } from "ahooks";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import Menu from "./Menu";
import Navbar from "./Navbar";

interface Props {
  navbar?: JSX.Element | null;
  children?: JSX.Element;
  loadMore?: () => void;
  loadMoreContent: JSX.Element | string;
  href: "/" | "/tags" | string;
}

const defaultProps: Props = {
  loadMoreContent: "加载中...",
  href: "/",
  navbar: <Navbar />,
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

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-100">
          {props.navbar}

          {/* children */}
          <div>
            {children}
            <div className="text-center pb-4" ref={loadMoreDom}>
              {props.loadMoreContent}
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <Menu library={library} href={props.href} />
        </div>
      </div>
    </>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;
