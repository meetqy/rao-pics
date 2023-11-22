import { useState } from "react";
import {
  ClockIcon,
  EyeIcon,
  FolderIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Content from "@renderer/components/Content";
import Row from "@renderer/components/Row";
import Title from "@renderer/components/Title";
import { useLanguage } from "@renderer/hooks";
import { QRCodeSVG } from "qrcode.react";

import { trpc } from "@rao-pics/trpc";

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
  const utils = trpc.useUtils();

  // 同步中、初始化中 禁用按钮
  const [disabled, setDisabled] = useState(false);

  const { data: config } = trpc.config.findUnique.useQuery();

  console.log(config);

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
          <Row
            left={
              <>
                <FolderIcon className="h-5 w-5" />
                <span className="ml-2">{lang.file_path}</span>
              </>
            }
            right={library?.path + "/123123/123/123"}
            onRightClick={() => {
              if (library) {
                window.shell.showItemInFolder(library.path);
              }
            }}
          />

          <Row
            left={
              <>
                <ClockIcon className="h-5 w-5" />
                <span className="ml-2 flex items-center">{lang.last_time}</span>
              </>
            }
            right={
              library?.lastSyncTime?.toLocaleString("zh", { hour12: false }) ??
              lang.un_sync
            }
          />

          <Row
            left={
              <>
                <PhotoIcon className="h-5 w-5" />
                <span className="ml-2">{lang.sync_count}</span>
              </>
            }
            right={
              <>
                <span className="text-success">{library?.syncCount ?? 0}</span>
                <span className="mx-1 text-base-content/60">｜</span>
                <span className="text-warning">
                  {library?.unSyncCount ?? 0}
                </span>
              </>
            }
          />
        </div>

        <div className="card-wrapper relative mt-4">
          <Row
            left={
              <>
                <div className="rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 text-white">
                  <EyeIcon className="h-4 w-4" />
                </div>
                <span className="ml-2 flex items-center">{lang.preview}</span>
              </>
            }
            right={
              config && (
                <div className="dropdown-hover dropdown">
                  <div
                    role="button"
                    tabIndex={0}
                  >{`http://${config.ip}:${config.clientPort}`}</div>
                  <div
                    role="button"
                    tabIndex={0}
                    className="dropdown-content right-0 rounded-md bg-base-100 p-4 shadow-md"
                  >
                    <QRCodeSVG
                      value={`http://${config.ip}:${config.clientPort}`}
                    />
                  </div>
                </div>
              )
            }
            onRightClick={() => {
              void window.shell.openExternal(
                `http://${config?.ip}:${config?.clientPort}`,
              );
            }}
          />
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
              {config?.autoSync ? (
                <button className="btn-disabled btn">已开启自动同步</button>
              ) : (
                <button
                  disabled={disabled}
                  className="btn-neutral btn"
                  onClick={onClickSync}
                >
                  {lang.btn_sync}
                </button>
              )}
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
