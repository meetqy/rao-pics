import Content from "@renderer/components/Content";
import { ArrowRightSvg } from "@renderer/components/Svg";
import Title from "@renderer/components/title";
import { useLanguage } from "@renderer/hooks";

const languages = {
  "zh-cn": {
    title: "基础信息",
    file_path: "文件路径",
    last_sync: "最后同步",
    preview: "预览",
    sync_count: "同步数量",
    btn_sync: "同步",
    btn_remove: "移除",
  },
  "en-us": {
    title: "Basic Information",
    file_path: "File Path",
    last_sync: "Last Sync",
    preview: "Preview",
    sync_count: "Sync Count",
    btn_sync: "Sync",
    btn_remove: "Remove",
  },
  "zh-tw": {
    title: "基礎信息",
    file_path: "文件路徑",
    last_sync: "最後同步",
    preview: "預覽",
    sync_count: "同步數量",
    btn_sync: "同步",
    btn_remove: "移除",
  },
};

const BasicPage = () => {
  const { lang } = useLanguage(languages);

  return (
    <Content title={<Title>{lang.title}</Title>}>
      <div className="px-4">
        <div className="card-wrapper">
          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
              <span className="ml-2">{lang.file_path}</span>
            </span>

            <span>
              <span>/Users/meetqy/Library/Caches/RaoPics</span>
              {ArrowRightSvg}
            </span>
          </div>

          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-2">{lang.last_sync}</span>
            </span>
            <span>2023-08-25 14:15</span>
          </div>
        </div>

        <div className="card-wrapper mt-4">
          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>

              <span className="ml-2 flex items-center">{lang.preview}</span>
            </span>

            <span>
              <span>http://localhost:3000</span>
              {ArrowRightSvg}
            </span>
          </div>

          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <span className="ml-2">{lang.sync_count}</span>
            </span>

            <span className="font-mono">
              <span className="text-success">0</span>
              <span className="mx-1 text-base-content/50">｜</span>
              <span className="text-warning">0</span>
            </span>
          </div>
        </div>

        <div className="mt-4 flex py-3">
          <div className="flex w-1/2 justify-center">
            <div
              className="radial-progress border-4 border-neutral/50 bg-neutral text-neutral-content/70"
              style={
                {
                  "--value": 70,
                  "--size": "9rem",
                  "--thickness": "1rem",
                } as React.CSSProperties
              }
            >
              70%
            </div>
          </div>

          <div className="w-1/2">
            <div className="m-auto flex h-full w-5/6 flex-col justify-center">
              <button className="btn-neutral btn">{lang.btn_sync}</button>
              <button className="btn-error btn-outline btn mt-4">
                {lang.btn_remove}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default BasicPage;