import { useState } from "react";
import { ArrowRightSvg } from "@renderer/components/Svg";

const types = ["全部", "回收站中", "格式不支持", "JSON 错误", "未知错误"];

const UnsyncPage = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="pb-4">
      <div className="sticky left-0 top-0 z-10 px-4">
        <div
          className={`card-wrapper overflow-hidden transition-all ${
            collapse ? "h-28" : "h-14"
          }`}
        >
          <div className="card-row relative items-center">
            <input
              type="text"
              placeholder="ID、路径搜索"
              className="input input-sm flex-1"
            />
            <button
              className="btn-ghost btn-square btn-sm btn absolute right-0 hover:bg-transparent"
              onClick={() => setCollapse((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`h-4 w-4 transition-transform ${
                  collapse ? "-rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>

          <div className="card-row">
            <div className="join">
              {types.map((item) => (
                <input
                  key={item}
                  className="btn-sm join-item btn"
                  type="radio"
                  name="options"
                  aria-label={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="card-wrapper mt-4">
          {new Array(50).fill(0).map((_item, index) => (
            <div className="card-row compact" key={index}>
              <span className="w-1/4 flex-shrink-0">失败原因</span>
              <span className="flex w-3/4 justify-end">
                <span className="overflow-hidden truncate text-base-content/60">
                  file:/Users/meetqy/Desktop/me/electron-vite-turbo
                </span>
                {ArrowRightSvg}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnsyncPage;
