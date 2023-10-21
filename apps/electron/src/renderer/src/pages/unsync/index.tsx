import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";
import { useDebounce, useLanguage } from "@renderer/hooks";
import { trpc } from "@renderer/utils/trpc";

const languages = {
  "zh-cn": {
    title: "未同步记录",
    input_placeholder: "ID、路径搜索",
    empty: "暂无记录",
  },
  "en-us": {
    title: "Unsynced Records",
    input_placeholder: "ID、Path Search",
    empty: "No Records",
  },
  "zh-tw": {
    title: "未同步記錄",
    input_placeholder: "ID、路徑搜索",
    empty: "暫無記錄",
  },
};

const UnsyncPage = () => {
  const { lang } = useLanguage(languages);

  const [keywords, setKeywords] = useState("");
  const debounceKeywords = useDebounce(keywords, 300);
  const lib = trpc.library.findUnique.useQuery();

  const logQuery = trpc.log.get.useQuery({
    limit: 50,
    keywords: debounceKeywords,
    orderBy: "desc",
  });

  const libPath = `${lib.data?.path}/images/`;

  const data = logQuery.data?.data ?? [];

  return (
    <Content title={<Title>{lang.title}</Title>}>
      <div className="pb-4">
        <div className="sticky left-0 top-0 z-10 px-4">
          <div className={`card-wrapper h-14 overflow-hidden transition-all`}>
            <div className="card-row relative items-center">
              <input
                type="text"
                placeholder={lang.input_placeholder}
                className="input input-sm flex-1"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex px-4">
          {data.length > 0 ? (
            <div className="card-wrapper mt-4 w-full">
              {data?.map((item, index) => (
                <div className="card-row compact" key={index}>
                  <div className="w-1/4 capitalize">
                    {item.type === "unknown" ? "unkonwn error" : item.type}
                  </div>
                  <div className="flex w-3/4 items-center justify-end">
                    <span
                      className="flex cursor-pointer items-center"
                      title={item.path}
                      onClick={() => {
                        void window.dialog.showErrorBox(
                          item.path,
                          item.message,
                        );
                      }}
                      aria-hidden="true"
                    >
                      <span className="text-base-content/50">
                        {item.path
                          .replace(libPath, "")
                          .replace("/metadata.json", "")}
                      </span>
                      <ChevronRightIcon className="right-svg" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-24 w-full text-center text-base-content/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="m-auto h-24 w-24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                />
              </svg>

              <p>{lang.empty}</p>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
};

export default UnsyncPage;
