import { useInViewport } from "ahooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import Alert from "./Alert";
import Logo from "./Logo";
import Menu from "./Menu";
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

  return (
    <div className="drawer">
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

        <Menu library={library} href={props.href} />
      </div>
    </div>
  );
};

Layout.defaultProps = defaultProps;

export default Layout;
