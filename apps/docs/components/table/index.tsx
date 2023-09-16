import styles from "./style.module.css";

export function OptionTable({
  options,
}: {
  options: [JSX.Element, JSX.Element, JSX.Element][];
}) {
  return (
    <div
      className={
        "-mx-6 mb-4 mt-6 overflow-x-auto overscroll-x-contain px-6 pb-4 " +
        styles.container
      }
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b py-4 text-left ">
            <th className="py-2 font-semibold">Option</th>
            <th className="py-2 pl-6 font-semibold">Type</th>
            <th className="px-6 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
          {options.map(([option, type, description], index) => (
            <tr key={index} className="border-b border-base-200">
              <td className="whitespace-pre py-2 font-mono text-xs font-semibold leading-6 text-primary">
                {option}
              </td>
              <td className="whitespace-pre py-2 pl-6 font-mono text-xs font-semibold leading-6 text-base-content/50">
                {type}
              </td>
              <td className="py-2 pl-6">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
