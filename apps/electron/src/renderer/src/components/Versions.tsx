import { useState } from "react";

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions);

  return (
    <div className="bg-base-200">
      <ul className="text-center">
        <li className="electron-version">Electron v{versions.electron}</li>
        <li className="chrome-version">Chromium v{versions.chrome}</li>
        <li className="node-version">Node v{versions.node}</li>
        <li className="v8-version">V8 v{versions.v8}</li>
      </ul>
    </div>
  );
}

export default Versions;
