interface Props {
  libraryId: number;
}

export const FailLogs = ({ libraryId }: Props) => {
  return (
    <div className="bg-base-100 scrollbar fixed left-0 top-0 z-10 h-full w-full overflow-y-auto p-4 pt-0">
      <div className="bg-base-100 relative z-10 h-4 w-full"></div>
      <table className="bg-base-100 table-compact table-zebra table w-full">
        <thead className="sticky left-0 top-0 w-full">
          <tr>
            <th className="rounded">ID</th>
            <th>路径</th>
            <th>原因</th>
            <th className="rounded">错误信息</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
            <tr key={item}>
              <td className="rounded">{item}</td>
              <td>lujing{item}</td>
              <td>yuanyin{item}</td>
              <td className="rounded">error{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
