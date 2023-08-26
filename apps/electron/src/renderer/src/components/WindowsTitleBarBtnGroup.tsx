const WindowsTitleBarBtnGroup = () => {
  return (
    <div className="flex h-10">
      <button className="btn-ghost btn-sm btn cursor-default rounded-none text-neutral/50 hover:bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="relative -top-1.5 h-5 w-5"
        >
          <path fill="currentColor" d="M6 21v-2h12v2H6Z" />
        </svg>
      </button>

      <button className="btn-ghost btn-sm btn cursor-default rounded-none  text-neutral/50 hover:bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="h-5 w-5"
        >
          <path
            fill="currentColor"
            d="M6 20q-.825 0-1.413-.588T4 18V6q0-.825.588-1.413T6 4h12q.825 0 1.413.588T20 6v12q0 .825-.588 1.413T18 20H6Zm0-2h12V6H6v12ZM6 6v12V6Z"
          />
        </svg>
      </button>

      <button
        onClick={() => window.close()}
        className="btn-ghost btn-sm btn cursor-default rounded-none hover:bg-red-500 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="h-5 w-5"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default WindowsTitleBarBtnGroup;
