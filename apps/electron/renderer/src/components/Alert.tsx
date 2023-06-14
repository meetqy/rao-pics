import { createRoot, type Root } from "react-dom/client";

interface Props {
  title?: JSX.Element | string;
  content?: JSX.Element | string;
}

const Alert = (props: Props) => {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" defaultChecked id="my-modal-4" className="modal-toggle" onClick={Alert.close} />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-info">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <span className="ml-2">~ 嗯，这是一个提示！</span>
          </h3>
          <p className="py-4">{props.content}</p>
        </label>
      </label>
    </>
  );
};

let root: Root | null = null;

Alert.close = () => {
  document.getElementById("alert-modal")?.remove();
  root?.unmount();
};

Alert.open = (text: string) => {
  const containerElement = document.createElement("div");
  containerElement.id = "alert-modal";
  document.body.appendChild(containerElement);
  root = createRoot(containerElement);

  root.render(<Alert content={text} />);
};

export default Alert;
