import { useState } from "react";
import {
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  FolderIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";
import { trpc } from "@renderer/utils/trpc";

import { SyncCircle } from "./SyncCircle";

const languages = {
  "zh-cn": {
    title: "基础信息",
    file_path: "资源库路径",
    preview: "预览",
    last_time: "最后同步",
    un_sync: "暂未同步",
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
    preview: "Preview",
    last_time: "Last Time",
    un_sync: "Un Sync",
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
    preview: "預覽",
    last_time: "最後同步",
    un_sync: "暫未同步",
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

  const { data: config } = trpc.config.findUnique.useQuery();

  const { data: library } = trpc.library.findUnique.useQuery();
  const onStartSync = trpc.sync.start.useMutation({
    onError: (err) => {
      console.error(err);
    },
  });

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

  const onClickSync = async () => {
    if (library) {
      await onStartSync.mutateAsync({
        libraryPath: library.path,
      });
    }
  };

  return (
    <Content title={<Title>{lang.title}</Title>}>
      <div className="px-4">
        <div className="card-wrapper">
          <div className="card-row">
            <span>
              <FolderIcon className="h-5 w-5" />

              <span className="ml-2">{lang.file_path}</span>
            </span>

            <span
              className="cursor-pointer font-mono text-base-content/60 transition-colors hover:text-base-content"
              aria-hidden="true"
              onClick={() => {
                if (library) {
                  window.shell.showItemInFolder(library.path);
                }
              }}
            >
              <span>{library?.path}</span>
              <ChevronRightIcon className="right-svg" />
            </span>
          </div>

          <div className="card-row">
            <span>
              <ClockIcon className="h-5 w-5" />

              <span className="ml-2 flex items-center">{lang.last_time}</span>
            </span>

            <span className="cursor-pointer font-mono text-base-content/60 transition-colors hover:text-base-content">
              {library?.lastSyncTime?.toLocaleString("zh", { hour12: false }) ??
                lang.un_sync}
            </span>
          </div>

          <div className="card-row">
            <span>
              <PhotoIcon className="h-5 w-5" />

              <span className="ml-2">{lang.sync_count}</span>
            </span>

            <span className="font-mono">
              <span className="text-success">{library?.syncCount ?? 0}</span>
              <span className="mx-1 text-base-content/60">｜</span>
              <span className="text-warning">{library?.unSyncCount ?? 0}</span>
            </span>
          </div>
        </div>

        <div className="card-wrapper mt-4">
          <div className="card-row">
            <span>
              <div className="rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 text-white">
                <EyeIcon className="h-4 w-4" />
              </div>

              <span className="ml-2 flex items-center">{lang.preview}</span>
            </span>

            <span
              aria-hidden="true"
              onClick={() => {
                void window.shell.openExternal(
                  `http://${config?.ip}:${config?.clientPort}`,
                );
              }}
              className="cursor-pointer font-mono text-base-content/60 transition-colors hover:text-base-content"
            >
              {config && (
                <span>{`http://${config.ip}:${config.clientPort}`}</span>
              )}
              <ChevronRightIcon className="right-svg" />
            </span>
          </div>
        </div>

        <div className="mt-4 flex py-3">
          <div className="flex w-1/2 justify-center">
            <SyncCircle
              pendingCount={library?.pendingCount ?? 0}
              onListenData={(status) => {
                if (status === "completed") {
                  setDisabled(false);
                } else {
                  !disabled && setDisabled(true);
                }
              }}
              onSyncData={(status) => {
                if (status === "completed") {
                  setDisabled(false);
                } else {
                  !disabled && setDisabled(true);
                }
              }}
            />
          </div>
          <div className="w-1/2">
            <div className="m-auto flex h-full w-5/6 flex-col justify-center">
              <button
                disabled={disabled}
                className="btn-neutral btn"
                onClick={onClickSync}
              >
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
