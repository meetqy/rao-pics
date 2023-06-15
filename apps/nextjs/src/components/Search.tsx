interface Props {
  className?: string;
  value?: string | undefined;
  onInput?: (value: string | undefined) => void;
}

const Search = ({ value, onInput, className }: Props) => {
  return (
    <div className={`items-center ${className}`}>
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <input
        value={value}
        onInput={(e) => onInput?.((e.target as EventTarget & HTMLInputElement).value)}
        type="text"
        placeholder="搜索"
        className="input w-1/3 focus:outline-none input-ghost h-12 normal-case"
      />
    </div>
  );
};

export default Search;
