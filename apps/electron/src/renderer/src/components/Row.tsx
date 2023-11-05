import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode | string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  compact?: boolean;
}

export const Row = (props: Props) => {
  return (
    <div className={`card-row ${props.compact ? "compact" : ""}`}>
      <div className="w-1/4" aria-hidden="true" onClick={props.onLeftClick}>
        {props.left}
      </div>

      <div
        className={`flex w-3/4 justify-end font-mono transition-colors ${
          props.onRightClick
            ? "cursor-pointer text-base-content/60 hover:text-base-content"
            : "text-base-content/60"
        }`}
        aria-hidden="true"
        onClick={props.onRightClick}
      >
        <div
          className={`w-4/5 max-w-[400px] text-right ${
            typeof props.right === "string" ? "truncate" : ""
          }`}
        >
          {props.right}
        </div>

        {props.onRightClick && <ChevronRightIcon className="ml-1 h-4 w-4" />}
      </div>
    </div>
  );
};

export default Row;
