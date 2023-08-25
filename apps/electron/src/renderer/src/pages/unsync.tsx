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

const UnsyncPage = () => {
  const language = languages["zh-cn"];

  return (
    <div className="flex h-full flex-col">
      <div className="scroll-y flex-1">
        <table className="table-pin-rows table-zebra table">
          <thead>
            <tr>
              <th className="rounded">{language.title1}</th>
              <th className="rounded">{language.title2}</th>
            </tr>
          </thead>
          <tbody>
            {new Array(50).fill(0).map((_item, index) => (
              <tr key={index}>
                <td className="cursor-pointer text-base-content/50 hover:underline">
                  .../127381/123/213
                </td>
                <td>啊换手机号尽快</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex h-12 w-full items-center justify-center">
        <div className="join">
          <button className="btn-sm join-item btn">«</button>
          <button className="btn-sm join-item btn">Page 22</button>
          <button className="btn-sm join-item btn">»</button>
        </div>
      </div>
    </div>
  );
};

export default UnsyncPage;
