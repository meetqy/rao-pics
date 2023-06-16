import { useRequest, useResponsive } from "ahooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { StringParam, useQueryParams } from "use-query-params";

import { CONSTANT } from "@acme/constant";

import { getGridOption } from "~/utils/common";
import Dropdown from "./Dropdown";
import Logo from "./Logo";
import Search from "./Search";

const Navbar = () => {
  const router = useRouter();

  const [params, setParams] = useQueryParams({
    ext: StringParam,
    // [filed, asc/desc]
    orderBy: StringParam,
    tag: StringParam,
    folder: StringParam,
    k: StringParam,
    // grid-cols-{grid}
    grid: StringParam,
  });

  const orderBy = useMemo(() => (params.orderBy || "createTime,desc").split(","), [params.orderBy]);

  const responsive = useResponsive();
  const { gridOption } = useMemo(() => getGridOption(responsive), [responsive]);

  useEffect(() => {
    if (gridOption && gridOption.length > 0) {
      const res = gridOption.filter((grid) => grid.replace("grid-cols-", "") === params.grid);
      if (res.length === 0 && router.isReady) {
        setParams({
          grid: gridOption[0]?.replace("grid-cols-", ""),
        });
      }
    }
  }, [gridOption, params, responsive, router.isReady]);

  const onGridNext = () => {
    if (!gridOption || gridOption.length === 0) return;

    const len = gridOption.length;

    const index = gridOption.findIndex((item) => item === `grid-cols-${params.grid}`);
    const nextIndex = (index + 1) % len;

    setParams({
      ...params,
      grid: gridOption[nextIndex]?.replace("grid-cols-", ""),
    });
  };

  const orderByOptions = [
    { name: "按创建时间", key: "createTime" },
    { name: "按文件大小", key: "size" },
    { name: "按文件名字", key: "name" },
  ];

  const [searchValue, setSearchValue] = useState<string | undefined>();
  const setParamsK = (k: string | undefined) => {
    return Promise.resolve(setParams({ ...params, k }));
  };
  const { run } = useRequest(setParamsK, {
    debounceWait: 500,
  });
  useEffect(() => {
    setSearchValue(params.k ?? undefined);
  }, [params.k]);
  useEffect(() => {
    run(searchValue);
  }, [searchValue]);

  return (
    <header className="w-full sticky top-0 left-0 z-20 xl:px-4 bg-base-100/90 backdrop-blur">
      <nav className="navbar w-full">
        <Logo className="lg:hidden" htmlFor="my-drawer-2" />

        <div className="flex-1">
          <Search value={searchValue} onInput={setSearchValue} className="lg:flex hidden w-1/2" inputClassName="w-full" />
        </div>

        <div className="flex-none xl:gap-1">
          <button className="btn btn-square btn-circle btn-ghost text-xl font-mono font-normal" onClick={onGridNext}>
            {params.grid}
          </button>

          <div className="hidden lg:block">
            {params.tag && (
              <button className="btn btn-ghost capitalize font-mono">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <span className="ml-2">{params.tag}</span>
                <span className="ml-2" onClick={() => setParams({ ...params, tag: undefined })}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-error">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>
            )}

            {params.folder && (
              <button className="btn btn-ghost capitalize font-mono">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>

                <span className="ml-2">{params.folder}</span>
                <span className="ml-2" onClick={() => setParams({ ...params, folder: undefined })}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-error">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          <Dropdown
            tabIndex={1}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
            }
            value={params.ext}
            options={CONSTANT.EXT.map((item) => ({ name: item, value: item }))}
            onChange={(value) => setParams({ ...params, ext: value })}
          />

          <div className="hidden lg:block ">
            <Dropdown
              tabIndex={2}
              showClose={false}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              }
              value={orderBy[0]}
              options={orderByOptions.map((item) => ({ name: item.name, value: item.key }))}
              onChange={(item) => {
                // setParams({
                //   ...params,
                //   orderBy: [item, orderBy[1]].join(","),
                // });
              }}
            />

            <button className="btn btn-ghost btn-square btn-circle hover:bg-transparent">
              <input
                name="sort"
                type="checkbox"
                checked={orderBy[1] === "desc"}
                onChange={(e) => {
                  // setParams({
                  //   ...params,
                  //   orderBy: [orderBy[0], e.target.checked ? "desc" : "asc"].join(","),
                  // });
                }}
                className="toggle toggle-primary toggle-sm -rotate-90"
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
