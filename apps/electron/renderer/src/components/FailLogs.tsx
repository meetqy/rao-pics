import { trpc } from "../utils/trpc";

interface Props {
  libraryId: number;
  onClose?: () => void;
}

const Temp = {
  "json-error": "JSON 解析错误",
  ext: "类型不支持",
  trash: "回收站",
};

type TempType = keyof typeof Temp;

export const FailLogs = ({ libraryId, onClose }: Props) => {
  const { data } = trpc.fail.get.useQuery({
    libraryId,
  });

  const getImageId = (path: string) => {
    const regex = /\/([A-Z0-9]+)\.info\//i;
    const match = path.match(regex);
    const imageId = match ? match[1] + ".info" : null;
    return imageId;
  };

  return (
    <div className="bg-neutral/70 fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center py-8">
      <button onClick={onClose} className="btn btn-xs btn-error btn-circle absolute right-2 top-2 z-30">
        ✕
      </button>

      <div className="bg-base-100 relative h-full w-11/12 rounded-md shadow">
        <div className="h-full w-full px-1 py-1">
          <div className="scrollbar m-auto h-full w-full overflow-y-auto px-3 pb-3">
            <div className="relative h-4 w-full"></div>
            <table className="bg-base-100 table-compact table-zebra m-auto table h-full w-full">
              <thead className="sticky left-0 top-0 w-full">
                <tr>
                  <th className="rounded">路径</th>
                  <th className="rounded">原因</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => {
                        void window.shell.showItemInFolder(item.path);
                      }}
                      className="text-base-content/50 cursor-pointer rounded hover:underline"
                    >
                      .../{getImageId(item.path)}
                    </td>
                    <td className="rounded">{Temp[item.type as TempType]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
