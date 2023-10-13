import { useState } from "react";
import { useRouter } from "next/router";
import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

const Setting = () => {
  const router = useRouter();
  const [setting, setSetting] = useState({
    layout: router.pathname.replace("/", "") || "masonry",
    sort: "asc",
  });

  const handleLayoutChange = async (layout: string) => {
    setSetting((prev) => ({ ...prev, layout }));
    await router.replace("/" + layout);
  };

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="drawer-button glass btn-md btn-circle btn fixed right-2 top-2"
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

                <select className="select select-sm bg-base-200 font-normal focus:outline-none">
                  <option>↑ 创建时间升序</option>
                  <option>↓ 创建时间降序</option>
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
