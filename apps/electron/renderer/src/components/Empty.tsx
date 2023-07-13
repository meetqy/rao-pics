import { useState } from "react";

interface Props {
  /** 添加 library */
  onAddClick?: () => void;
}

const Empty = (props: Props) => {
  const [appName, setAppName] = useState<string>();
  const [appVersion, setAppVersion] = useState<string>();

  window.app.getVersion().then((version) => {
    if (version === appVersion) return;
    setAppVersion(version);
  });

  window.app.getName().then((name) => {
    if (name === appName) return;
    setAppName(name);
  });

  return (
    <div className="w-3/4 flex justify-center items-center ">
      <div className="card card-compact w-4/5 bg-base-100">
        <img src="logo.png" alt="rao.pics logo" className="w-1/3 rounded-full shadow shadow-neutral m-auto" />
        <div className="card-body items-center text-center">
          <h2 className="card-title !mb-0">{appName}</h2>
          <p className="text-base-content/50 ">~~ 暂未添加文件夹 ~~</p>
          <div className="card-actions mt-2">
            <button className="btn btn-wide btn-primary" onClick={props.onAddClick}>
              添加文件夹/库
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;
