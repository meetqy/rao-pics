import type { ChangeEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArrowsUpDownIcon,
  TrashIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

import type { SettingType } from "~/states/setting";
import { settingSelector } from "~/states/setting";
import { trpc } from "~/utils/trpc";
import FolderTree from "./FolderTree";
import styles from "./index.module.css";

const Setting = () => {
  const router = useRouter();
  const [setting, setSetting] = useRecoilState(settingSelector);

  const search = useSearchParams();

  const { data: config } = trpc.config.findUnique.useQuery();
  const { data: folderTree } = trpc.folder.findTree.useQuery();

  const handleLayoutChange = (layout: SettingType["layout"]) => {
    setSetting((prev) => ({
      ...prev,
      layout,
    }));

    router.replace(`/${layout}?${search.toString()}`);
  };

  const changeOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSetting((prev) => ({
      ...prev,
      orderBy: {
        modificationTime: e.target
          .value as SettingType["orderBy"]["modificationTime"],
      },
    }));
  };

  return (
    <>
      <div className="setting drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className={`btn btn-circle btn-neutral drawer-button fixed left-3 top-3 z-50 opacity-20 transition-all ease-in hover:opacity-100`}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="min-h-full w-80 bg-base-100 p-4 md:w-96">
            <div className="rounded-md border border-base-content/10 bg-base-200/30 px-4">
              <div className={styles.row}>
                <span className={styles.rowTitle}>
                  <AdjustmentsVerticalIcon className="mr-1 h-5 w-5" />
                  布局方式
                </span>

                <div className="join">
                  <button
                    onClick={() => handleLayoutChange("masonry")}
                    className={`btn join-item btn-sm font-normal ${
                      setting.layout === "masonry" ? "btn-primary" : ""
                    }`}
                  >
                    瀑布流
                  </button>
                  <button
                    onClick={() => handleLayoutChange("responsive")}
                    className={`btn join-item btn-sm font-normal ${
                      setting.layout === "responsive" ? "btn-primary" : ""
                    }`}
                  >
                    自适应
                  </button>
                </div>
              </div>

              <div className={styles.row}>
                <span className={styles.rowTitle}>
                  <ArrowsUpDownIcon className="mr-1 h-5 w-5" />
                  排序方式
                </span>

                <select
                  value={setting.orderBy.modificationTime}
                  onChange={changeOrderBy}
                  className="select select-sm bg-base-200 font-normal focus:outline-none"
                >
                  <option value={"asc"}>↑ 添加时间</option>
                  <option value={"desc"}>↓ 添加时间</option>
                </select>
              </div>
            </div>

            <div className="relative mt-4 rounded-md border border-base-content/10 bg-base-200/30">
              <ul className="menu font-mono text-base">
                <li>
                  <Link
                    href={`/${setting.layout}`}
                    className="flex justify-between"
                  >
                    <span className="flex items-center">
                      <WalletIcon className="mr-1 h-5 w-5" />
                      全部
                    </span>

                    <span className=" text-sm text-base-content/30">
                      {setting.count}
                    </span>
                  </Link>
                </li>
                {config?.trash && (
                  <li>
                    <Link
                      href={`/${setting.layout}?m=trash`}
                      className="flex justify-between"
                    >
                      <span className="flex">
                        <TrashIcon className="mr-1 h-5 w-5" />
                        回收站
                      </span>

                      <span className="text-sm text-base-content/30">
                        {setting.trashCount || null}
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="relative mt-4 rounded-md border border-base-content/10 bg-base-200/30">
              {folderTree && <FolderTree data={folderTree} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
