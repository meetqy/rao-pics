import { useRequest, useResponsive } from "ahooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { StringParam, useQueryParams } from "use-query-params";

import { CONSTANT } from "@acme/constant";

import { getGridOption } from "~/utils/common";
import { trpc } from "~/utils/trpc";
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

  const { data: extData } = trpc.image.groupByFieldCount.useQuery("ext");
  const videosExt = useMemo(() => extData?.filter((e) => CONSTANT.VIDEO_EXT.includes(e.ext)), [extData]);
  const imgsExt = useMemo(() => extData?.filter((e) => CONSTANT.IMG_EXT.includes(e.ext)), [extData]);

  const [videoVal, setVideoVal] = useState<string | null>();
  const [imgVal, setImgVal] = useState<string | null>();

  useEffect(() => {
    if (CONSTANT.IMG_EXT.includes(params.ext)) {
      setImgVal(params.ext);
    } else if (CONSTANT.VIDEO_EXT.includes(params.ext)) {
      setVideoVal(params.ext);
    }
  }, [videoVal, imgVal, params.ext]);

  const onDropdownChange = (value: string | undefined | null, name: "imgVal" | "videoVal") => {
    if (name === "imgVal") {
      setImgVal(value);
      setParams({ ...params, ext: value });
    } else if (name === "videoVal") {
      setVideoVal(value);
      setParams({ ...params, ext: value });
    }
  };

  useEffect(() => {
    if (gridOption && gridOption.length > 0) {
      const res = gridOption.filter((grid) => grid.replace("grid-cols-", "") === params.grid);
      if (res.length === 0 && router.isReady) {
        setParams({
          grid: gridOption[0]?.replace("grid-cols-", ""),
        });
      }
    }
  }, [gridOption, params, responsive, router.isReady, setParams]);

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
  }, [run, searchValue]);

  return (
    <header className="bg-base-100/90 sticky left-0 top-0 z-20 w-full backdrop-blur xl:px-4">
      <nav className="navbar w-full">
        <Logo className="lg:hidden" htmlFor="my-drawer" />

        <div className="flex-1">
          <Search value={searchValue} onInput={setSearchValue} className="hidden w-1/2 lg:flex" inputClassName="w-full" />
        </div>

        <div className="flex-none xl:gap-1">
          <button className="btn btn-square btn-circle btn-ghost font-mono text-xl font-normal" onClick={onGridNext}>
            {params.grid}
          </button>

          <div className="hidden lg:block">
            {params.tag && (
              <button className="btn btn-ghost font-mono capitalize">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <span className="ml-2">{params.tag}</span>
                <span className="ml-2" onClick={() => setParams({ ...params, tag: undefined })}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-error h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>
            )}

            {params.folder && (
              <button className="btn btn-ghost font-mono capitalize">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>

                <span className="ml-2">{params.folder}</span>
                <span className="ml-2" onClick={() => setParams({ ...params, folder: undefined })}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-error h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          {/* photo */}
          {imgsExt && imgsExt.length > 0 && (
            <Dropdown
              tabIndex={3}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              }
              value={imgVal}
              options={imgsExt.map((item) => ({ name: item.ext, value: item.ext, desc: item._sum.id?.toString() }))}
              onChange={(val) => onDropdownChange(val, "imgVal")}
            />
          )}

          {/* videos */}
          {videosExt && videosExt.length > 0 && (
            <Dropdown
              tabIndex={2}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              }
              value={videoVal}
              options={videosExt.map((item) => ({ name: item.ext, value: item.ext, desc: item._sum.id?.toString() }))}
              onChange={(val) => onDropdownChange(val, "videoVal")}
            />
          )}
          {/* 排序 */}
          <div className="hidden lg:block ">
            <Dropdown
              tabIndex={2}
              showClose={false}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
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
                setParams({
                  ...params,
                  orderBy: [item, orderBy[1]].join(","),
                });
              }}
            />

            <button className="btn btn-ghost btn-square btn-circle hover:bg-transparent">
              <input
                name="sort"
                type="checkbox"
                checked={orderBy[1] === "desc"}
                onChange={(e) => {
                  setParams({
                    ...params,
                    orderBy: [orderBy[0], e.target.checked ? "desc" : "asc"].join(","),
                  });
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
