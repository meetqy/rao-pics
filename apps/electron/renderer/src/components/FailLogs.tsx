import { trpc } from "../utils/trpc";

interface Props {
  libraryId: number;
  onClose?: () => void;
}

export const FailLogs = ({ libraryId, onClose }: Props) => {
  const { data } = trpc.fail.get.useQuery({
    libraryId,
  });

  return (
    <div className="bg-base-100 scrollbar fixed left-0 top-0 z-10 h-full w-full overflow-y-auto p-4 pt-0">
      <button onClick={onClose} className="btn btn-xs btn-error btn-outline btn-circle absolute right-1 top-1 z-30">
        ✕
      </button>
      <div className="bg-base-100 relative z-10 h-4 w-full"></div>
      <table className="bg-base-100 table-compact table-zebra table w-full">
        <thead className="sticky left-0 top-0 w-full">
          <tr>
            <th className="rounded">路径</th>
            <th>原因</th>
            <th className="rounded">错误信息</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td className="rounded">{item.path}</td>
              <td>{item.type}</td>
              <td className="rounded">{item.error}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
