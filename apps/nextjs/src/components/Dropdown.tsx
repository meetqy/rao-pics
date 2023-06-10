import { useEffect, useState } from "react";

type Value = string | undefined | null;

interface Props {
  tabIndex: number;
  value: Value;
  icon: JSX.Element;
  showClose?: boolean;
  options: { name: string; value: string }[];
  onChange: (value: Value) => void;
}

const Dropdown = (props: Props) => {
  const { value, onChange, options, icon, tabIndex, showClose } = props;
  const [_value, setValue] = useState<Value>(value);

  useEffect(() => {
    onChange(_value);
  }, [_value]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={tabIndex} className="btn m-1 btn-ghost btn-circle">
        {icon}
      </label>

      {_value && showClose && (
        <div className="absolute right-1 top-1 z-50 btn btn-ghost btn-circle btn-xs" onClick={() => setValue(undefined)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}

      <ul tabIndex={tabIndex} className="dropdown-content menu p-2 shadow-md bg-base-200/90 backdrop-blur rounded-box w-40 uppercase">
        {options.map((item) => (
          <li key={item.value}>
            <a onClick={() => setValue(item.value)} className={item.value === _value ? "active" : ""}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Dropdown.defaultProps = {
  showClose: true,
};

export default Dropdown;
