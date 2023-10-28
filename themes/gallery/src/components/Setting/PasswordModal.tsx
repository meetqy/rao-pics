import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";

interface Props {
  passwordTips?: string;
  onOk: (
    password: string,
    setVisible: Dispatch<SetStateAction<boolean>>,
  ) => void;
}

const PasswordModal = (props: Props) => {
  const [visible, setVisible] = useState(true);
  const [password, setPassword] = useState("");

  return (
    <>
      <input
        type="checkbox"
        checked={visible}
        readOnly
        id="password-modal"
        className="modal-toggle"
      />
      <div id="password-modal" className="modal">
        <div className="modal-box">
          <h3 className="text-center text-lg font-bold">输入密码查看内容</h3>
          <p className="pb-4 pt-8 text-center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={`密码提示：${props.passwordTips ?? "无"}`}
              className="input-bordered input w-full max-w-xs"
            />
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setVisible(false)}>
              取消
            </button>
            <button
              className="btn-primary btn"
              onClick={() => props.onOk(password, setVisible)}
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

PasswordModal.displayName = "PasswordModal";
PasswordModal.open = (props: Props) => {
  document.querySelector("#password-modal-root")?.remove();

  const domNode = document.createElement("div");
  domNode.id = "password-modal-root";
  const root = createRoot(domNode);

  root.render(<PasswordModal {...props} />);
  document.body.appendChild(domNode);
};

export default PasswordModal;
