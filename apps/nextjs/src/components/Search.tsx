interface Props {
  className?: string;
  inputClassName?: string;
  value?: string | undefined;
  onInput?: (value: string | undefined) => void;
}

const Search = ({ value, onInput, className, inputClassName }: Props) => {
  return (
    <div className={`items-center ${className} relative`}>
      <svg className="w-6 h-6 absolute left-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <input
        value={value}
        onInput={(e) => onInput?.((e.target as EventTarget & HTMLInputElement).value)}
        type="text"
        placeholder="搜索"
        className={`input input-ghost normal-case h-10 pl-10 ${inputClassName}`}
      />
    </div>
  );
};

export default Search;
