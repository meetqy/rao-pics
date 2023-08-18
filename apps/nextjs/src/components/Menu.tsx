import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { trpc } from "~/utils/trpc";
import { languages, type Lang } from "~/lang";
import Logo from "./Logo";
import Search from "./Search";

interface MenuProps {
  library: string;
  href: string;
}

const Menu = ({ library, href }: MenuProps) => {
  const router = useRouter();

  const { data: config } = trpc.config.get.useQuery();

  const language = useMemo(() => languages[(config?.lang ?? "zh_cn").replace("-", "_") as Lang], [config]);

  const goHome = () => {
    const { grid } = router.query;

    void router.push(`/${library}?grid=${grid}`);
  };

  return (
    <aside className="bg-base-100 text-base-content z-50 w-72">
      <div className="sticky top-0 p-2">
        <Logo className="hidden lg:flex" />
        <Search language={language} className="mt-2 flex lg:hidden" inputClassName="w-full" />
      </div>

      <ul className="menu my-2 p-2">
        <li>
          <div onClick={goHome} className={`font-mono font-bold capitalize`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            {library}
          </div>
        </li>
        <li>
          <Link href={`/${library}/tags`} className={href === "/tags" ? "active" : ""}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                clipRule="evenodd"
              />
            </svg>
            {language?.tag}
          </Link>
        </li>
        <li>
          <Link href={`/${library}/folders`} className={href === "/folders" ? "active" : ""}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
            </svg>
            {language?.folder}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Menu;
