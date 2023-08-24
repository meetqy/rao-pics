import "./index.css";

const languages = {
  "zh-cn": {
    file_id: "文件夹 ID",
    file_path: "文件夹路径",
    last_time: "最后同步",
    preview: "WEB 预览",
    status: "已同步/未同步",
    status_tips: "可点击数字查看详情",
  },
  "en-us": {
    file_id: "File ID",
    file_path: "File Path",
    last_time: "Last Sync",
    preview: "WEB Preview",
    status: "Synced/Unsynced",
    status_tips: "Click the number to view details",
  },
  "zh-tw": {
    file_id: "文件夾 ID",
    file_path: "文件夾路徑",
    last_time: "最後同步",
    preview: "WEB 預覽",
    status: "已同步/未同步",
    status_tips: "可點擊數字查看詳情",
  },
};

export const Content = () => {
  const language = languages["zh-cn"];

  const percent = 23;

  return (
    <div className="list h-full w-full rounded shadow-md">
      <div>
        <span className="flex items-center">
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
              d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
            />
          </svg>

          <span className="ml-2">{language.file_id}</span>
        </span>
        <span className="font-mono">shajdhaj-123123</span>
      </div>

      <div>
        <span className="flex items-center">
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
          <span className="ml-2">{language.file_path}</span>
        </span>
        <span>skasjdkasjdkasjk</span>
      </div>

      <div>
        <span className="flex items-center">
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
          <span className="ml-2">{language.last_time}</span>
        </span>
        <span className="font-mono">撒健康东街阿昆达金阿奎手机</span>
      </div>

      <div>
        <span className="flex items-center">
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

          <span className="ml-2 flex items-center">{language.preview}</span>
        </span>
        <a className="group btn-link btn-active btn-sm btn relative p-0 font-normal normal-case text-secondary">
          http://localhost:3000
          <div className="absolute right-0 top-8 z-50 hidden rounded bg-white p-2 shadow-md group-hover:block">
            {/* <QRCodeSVG
              value={webUrl}
              level="H"
              size={156}
              imageSettings={{
                src: "./logo.png",
                width: 48,
                height: 48,
                excavate: true,
              }}
            /> */}
          </div>
        </a>
      </div>

      <div>
        <span className="flex items-center">
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

          <div className="ml-2 flex items-center">
            {language.status}
            <div
              className="tooltip before:w-max"
              data-tip={language.status_tips}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-base-content/50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
          </div>
        </span>
        <span className="font-mono font-medium">
          <span className="text-success">{123}</span>
          <span className="relative -top-0.5 mx-2 font-extralight text-base-content/50">
            |
          </span>
          {/* The button to open modal */}
          <label htmlFor="fail-log-modal" className="cursor-pointer text-error">
            {123}
          </label>
        </span>
      </div>

      <div className="flex flex-1 items-center justify-around !px-0">
        <div className="flex h-full flex-1 items-center justify-center bg-base-200">
          <div
            className="radial-progress border-4 border-neutral/50 bg-neutral text-neutral-content/70"
            style={
              {
                "--value": percent,
                "--size": "9rem",
                "--thickness": "1rem",
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col items-center justify-center text-neutral-content">
              <span className="text-xl font-bold text-neutral-content">
                {22}
              </span>
              <span className="text-neutral-content/80">23</span>
            </div>
          </div>
        </div>

        <div className="flex h-full w-1/2 flex-col justify-center space-y-4 px-8">
          <button className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span className="ml-2">同步</span>
          </button>

          <button className="btn-error btn-outline btn px-0">
            <label
              htmlFor="my-modal"
              className="flex h-full w-full cursor-pointer items-center justify-center"
              // onClick={() => {
              //   if (disabled) return;
              //   setDelConfirmVisable(true);
              // }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="ml-2">移除</span>
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};
