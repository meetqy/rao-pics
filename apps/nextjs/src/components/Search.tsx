import { type languages } from "~/lang";

interface Props {
  className?: string;
  inputClassName?: string;
  value?: string | undefined;
  language?: (typeof languages)["zh_cn"];
  onInput?: (value: string | undefined) => void;
}

const Search = ({ value, onInput, className, inputClassName, language }: Props) => {
  return (
    <div className={`items-center ${className} relative`}>
      <svg className="absolute left-2 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <input
        value={value}
        onInput={(e) => onInput?.((e.target as EventTarget & HTMLInputElement).value)}
        type="text"
        placeholder={language?.search}
        className={`input input-ghost h-10 pl-10 normal-case ${inputClassName}`}
      />
    </div>
  );
};

export default Search;
