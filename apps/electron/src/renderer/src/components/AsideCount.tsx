interface AsideCountProps {
  imageCount: number;
  mediaCount: number;
}

const formatNumber = (num: number) => {
  if (num < 1000) {
    return num;
  } else if (num < 1000000) {
    return `${(num / 1000).toFixed(1).replace(".0", "")}k`;
  } else {
    return `${(num / 10000).toFixed(1).replace(".0", "")}w`;
  }
};

export const AsideCount = ({ imageCount, mediaCount }: AsideCountProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-y-4">
      <div className="select-none border-l-2 border-base-content/20 p-2 capitalize text-base-content">
        <p className="font-mono text-5xl">{formatNumber(imageCount)}</p>
        <p className="opacity-25">图片总数</p>
      </div>

      <div className="select-none border-l-2 border-base-content/20 p-2  capitalize text-base-content">
        <p className="font-mono text-5xl">{formatNumber(mediaCount)}</p>
        <p className="opacity-25">媒体总数</p>
      </div>
    </div>
  );
};
