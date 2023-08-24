const languages = {
  "zh-cn": {
    title1: "路径",
    title2: "原因",
    confirm: "确认",
    "json-error": "JSON 解析错误",
    ext: "类型不支持",
    trash: "回收站中",
    unknown: "未知错误",
  },
  "en-us": {
    title1: "Path",
    title2: "Reason",
    confirm: "Confirm",
    "json-error": "JSON parsing error",
    ext: "Type not supported",
    trash: "In the trash",
    unknown: "Unknown error",
  },
  "zh-tw": {
    title1: "路徑",
    title2: "原因",
    confirm: "確認",
    "json-error": "JSON 解析錯誤",
    ext: "類型不支持",
    trash: "回收站中",
    unknown: "未知錯誤",
  },
};

export const FailLogModal = () => {
  const language = languages["zh-cn"];

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="fail-log-modal" className="modal-toggle" />
      <div className="modal">
        <div className="scrollbar modal-box max-w-2xl rounded-md p-0">
          <table className="table-compact table-zebra m-auto table h-full w-full">
            <thead className="sticky left-0 top-0 w-full bg-base-100">
              <tr>
                <th className="rounded">{language.title1}</th>
                <th className="rounded">{language.title2}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((_item, index) => (
                <tr key={index}>
                  <td className="cursor-pointer rounded text-base-content/50 hover:underline">
                    .../127381/123/213
                  </td>
                  <td className="rounded">啊换手机号尽快</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="modal-action sticky bottom-4 pr-4">
            <label htmlFor="fail-log-modal" className="btn-sm btn">
              {language.confirm}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
