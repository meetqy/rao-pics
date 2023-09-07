import { useState } from "react";
import Content from "@renderer/components/Content";
import { ArrowRightSvg } from "@renderer/components/Svg";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";
import { trpc } from "@renderer/utils/trpc";

const languages = {
  "zh-cn": {
    title: "未同步记录",
    types: ["全部", "格式不支持", "JSON 错误", "未知错误"],
    input_placeholder: "ID、路径搜索",
  },
  "en-us": {
    title: "Unsynced Records",
    types: ["All", "Not Supported", "JSON Error", "Unknown Error"],
    input_placeholder: "ID、Path Search",
  },
  "zh-tw": {
    title: "未同步記錄",
    types: ["全部", "格式不支持", "JSON 錯誤", "未知錯誤"],
    input_placeholder: "ID、路徑搜索",
  },
};

const UnsyncPage = () => {
  const [collapse, setCollapse] = useState(false);
  const { lang, language } = useLanguage(languages);

  const [keywords, setKeywords] = useState();
  const lib = trpc.library.get.useQuery();

  const logQuery = trpc.log.get.useQuery({
    limit: 50,
    keywords,
    orderBy: "desc",
  });

  const libPath = `${lib.data?.path}/images/`;

  const data = logQuery.data?.data;

  // const data = logs.data?.pages[0];

  return (
    <Content title={<Title>{lang.title}</Title>}>
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
                placeholder={lang.input_placeholder}
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
                {lang.types.map((item) => (
                  <input
                    key={item}
                    className={`join-item btn ${
                      language === "en-us" ? "btn-xs" : "btn-sm"
                    }`}
                    type="radio"
                    name="options"
                    aria-label={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex px-4">
          <div className="card-wrapper mt-4 w-full">
            {data?.map((item, index) => (
              <div className="card-row compact" key={index}>
                <div className="w-1/4">{item.type}</div>
                <div className="flex w-3/4 items-center justify-end">
                  <span
                    className="tooltip flex cursor-pointer items-center"
                    data-tip={item.path}
                  >
                    <span className="text-base-content/60">
                      {item.path
                        .replace(libPath, "")
                        .replace("/metadata.json", "")}
                    </span>
                    {ArrowRightSvg}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default UnsyncPage;
