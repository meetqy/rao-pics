import { useState } from "react";
import Content from "@renderer/components/Content";
import { ArrowRightSvg } from "@renderer/components/Svg";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";
import { trpc } from "@renderer/utils/trpc";

import { SyncCircle } from "./SyncCircle";

const languages = {
  "zh-cn": {
    title: "基础信息",
    file_path: "资源库路径",
    last_sync: "最后同步",
    preview: "预览",
    sync_count: "同步数量",
    btn_sync: "同步",
    btn_remove: "移除",
    question_btn1: "取消",
    question_btn2: "确定",
    question_title: "提示",
    question_message: "确定要移除此库吗？",
    sync_desc1: "读取中...",
    sync_desc2: "等待同步",
  },
  "en-us": {
    title: "Basic Information",
    file_path: "Library Path",
    last_sync: "Last Sync",
    preview: "Preview",
    sync_count: "Sync Count",
    btn_sync: "Sync",
    btn_remove: "Remove",
    question_btn1: "Cancel",
    question_btn2: "OK",
    question_title: "Prompt",
    question_message: "Are you sure you want to remove this library?",
    sync_desc1: "Reading...",
    sync_desc2: "Waiting...",
  },
  "zh-tw": {
    title: "基礎信息",
    file_path: "资源库路径",
    last_sync: "最後同步",
    preview: "預覽",
    sync_count: "同步數量",
    btn_sync: "同步",
    btn_remove: "移除",
    question_btn1: "取消",
    question_btn2: "確定",
    question_title: "提示",
    question_message: "確定要移除此庫嗎？",
    sync_desc1: "讀取中...",
    sync_desc2: "等待同步",
  },
};

const BasicPage = () => {
  const { lang } = useLanguage(languages);
  const utils = trpc.useContext();

  // 同步中、初始化中 禁用按钮
  const [disabled, setDisabled] = useState(false);

  const { data: library } = trpc.library.get.useQuery();

  const onBeforeDeleteLibrary = () => {
    window.dialog
      .showMessageBox({
        type: "question",
        buttons: [lang.question_btn1, lang.question_btn2],
        title: lang.question_title,
        message: lang.question_message,
      })
      .then((res) => {
        if (res === 1) {
          void deleteLibrary.mutateAsync();
        }
      })
      .catch((e) =>
        window.dialog.showErrorBox("onBeforeDeleteLibrary", JSON.stringify(e)),
      );
  };
  const deleteLibrary = trpc.library.delete.useMutation({
    onSuccess: () => {
      void utils.library.invalidate();
    },
  });

  return (
    <Content title={<Title>{lang.title}</Title>}>
      <div className="px-4">
        <div className="card-wrapper">
          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
              <span className="ml-2">{lang.file_path}</span>
            </span>

            <span
              className="cursor-pointer"
              aria-hidden="true"
              onClick={() => {
                if (library) {
                  window.shell.showItemInFolder(library.path);
                }
              }}
            >
              <span>{library?.path}</span>
              {ArrowRightSvg}
            </span>
          </div>

          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-2">{lang.last_sync}</span>
            </span>
            <span>2023-08-25 14:15</span>
          </div>
        </div>

        <div className="card-wrapper mt-4">
          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>

              <span className="ml-2 flex items-center">{lang.preview}</span>
            </span>

            <span>
              <span>http://localhost:3000</span>
              {ArrowRightSvg}
            </span>
          </div>

          <div className="card-row">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <span className="ml-2">{lang.sync_count}</span>
            </span>

            <span className="font-mono">
              <span className="text-success">0</span>
              <span className="mx-1 text-base-content/50">｜</span>
              <span className="text-warning">0</span>
            </span>
          </div>
        </div>

        <div className="mt-4 flex py-3">
          <div className="flex w-1/2 justify-center">
            <SyncCircle pendingCount={library?.pendingCount ?? 0} />
          </div>
          <div className="w-1/2">
            <div className="m-auto flex h-full w-5/6 flex-col justify-center">
              <button disabled={disabled} className="btn-neutral btn">
                {lang.btn_sync}
              </button>
              <button
                disabled={disabled}
                className="btn-error btn-outline btn mt-4"
                onClick={onBeforeDeleteLibrary}
              >
                {lang.btn_remove}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default BasicPage;
