import type { ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

import type { SettingType } from "~/states/setting";
import { settingSelector } from "~/states/setting";

const Setting = () => {
  const router = useRouter();
  const [setting, setSetting] = useRecoilState(settingSelector);

  const handleLayoutChange = async (layout: SettingType["layout"]) => {
    setSetting((prev) => ({
      ...prev,
      layout,
    }));
    await router.replace("/" + layout);
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
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className={`drawer-button glass btn-md btn-circle btn fixed left-3 top-3 transition-all duration-200 ease-in`}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="min-h-full w-80 bg-base-100 p-4 text-base md:w-96">
            <div className="rounded-md border border-base-content/10 bg-base-200/30 px-4">
              <div className="flex justify-between py-3">
                <span className="flex items-center">
                  <AdjustmentsVerticalIcon className="mr-1 h-4 w-4" />
                  布局方式
                </span>

                <div className="join">
                  <button
                    onClick={() => handleLayoutChange("masonry")}
                    className={`btn-sm join-item btn font-normal ${
                      setting.layout === "masonry" ? "btn-primary" : ""
                    }`}
                  >
                    瀑布流
                  </button>
                  <button
                    onClick={() => handleLayoutChange("responsive")}
                    className={`btn-sm join-item btn font-normal ${
                      setting.layout === "responsive" ? "btn-primary" : ""
                    }`}
                  >
                    自适应
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-t border-base-content/10 py-3">
                <span className="flex items-center">
                  <ArrowsUpDownIcon className="mr-1 h-4 w-4" />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
