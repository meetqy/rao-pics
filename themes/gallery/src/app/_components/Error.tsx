import { useRouter } from "next/navigation";

interface Props {
  statusCode: number;
  statusMessage: string;
  btnText: string;
  onClick?: () => void;
}

export default function Error(props: Props) {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center scrollbar-h-screen">
      <div className="m-auto text-left">
        <h1 className="space-x-2 font-serif text-6xl">
          <span className=" text-red-500">R</span>
          <span className=" text-orange-500">a</span>
          <span className=" text-yellow-500">o</span>.
          <span className=" text-green-500">P</span>
          <span className=" text-teal-500">i</span>
          <span className=" text-blue-500">c</span>
          <span className=" text-purple-500">s</span>
        </h1>
        <p className="mt-4">
          <strong className="text-3xl">{props.statusCode}.</strong>
          <span className="ml-2 font-normal text-base-content/50">
            {props.statusMessage}
          </span>
        </p>
        <p className="mt-12">
          <button
            className="btn"
            onClick={() => {
              if (props.onClick) {
                props.onClick();
              } else {
                router.replace("/");
              }
            }}
          >
            {props.btnText}
          </button>
        </p>
      </div>
    </div>
  );
}
