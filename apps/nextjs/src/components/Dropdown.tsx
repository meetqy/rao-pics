import { useEffect, useState } from "react";

type Value = string | undefined | null;

interface Props {
  tabIndex: number;
  value: Value;
  icon: JSX.Element;
  showClose?: boolean;
  options: { name: string; value: string; desc?: string | JSX.Element }[];
  onChange: (value: Value) => void;
}

const Dropdown = (props: Props) => {
  const { value, onChange, options, icon, tabIndex, showClose } = props;
  const [_value, setValue] = useState<Value>(value);

  useEffect(() => {
    if (value === _value) return;
    onChange(_value);
  }, [_value, onChange, value]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={tabIndex} className="btn btn-ghost btn-circle m-1">
        {icon}
      </label>

      {_value && showClose && (
        <div className="btn btn-ghost btn-circle btn-xs absolute right-1 top-1 z-50" onClick={() => setValue(undefined)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}

      <ul tabIndex={tabIndex} className="dropdown-content menu bg-base-200/90 rounded-box max-h-96 w-56 overflow-y-auto p-2 uppercase shadow-md backdrop-blur">
        <div className="grid w-full grid-cols-1">
          {options.map((item) => (
            <li key={item.value}>
              <a onClick={() => setValue(item.value)} className={`${item.value === _value ? "active" : ""} flex justify-between`}>
                {item.name}
                {typeof item.desc === "string" ? <span className="text-base-content/50 ml-1 text-xs">{item.desc}</span> : item.desc}
              </a>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  showClose: true,
};

export default Dropdown;
