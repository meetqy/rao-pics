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
import { useSite } from "@renderer/hooks";
import { QRCodeSVG } from "qrcode.react";

import { trpc } from "@rao-pics/trpc";

import { SyncCircle } from "./SyncCircle";

const BasicPage = () => {
  const utils = trpc.useUtils();

  const { data: config } = trpc.config.findUnique.useQuery();

  const { data: library } = trpc.library.findUnique.useQuery();
  const onStartSync = trpc.sync.start.useMutation({
    onError: (err) => {
      console.error(err);
    },
  });

  // 同步中、初始化中 禁用按钮
  const [disabled, setDisabled] = useState({
    sync: library?.pendingCount === 0,
    delete: false,
  });

  const site = useSite();

  const onBeforeDeleteLibrary = () => {
    window.dialog
      .showMessageBox({
        type: "question",
        buttons: ["取消", "确认"],
        title: "提示",
        message: "确定要移除此库吗？",
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

  const SyncButton = () => {
    if (config?.autoSync) {
      return (
        <button className="btn" disabled>
          已开启自动同步
        </button>
      );
    }

    return (
      <button
        disabled={disabled.sync}
        className="btn-neutral btn"
        onClick={onClickSync}
      >
        {library?.pendingCount ? "同步" : "无需同步"}
      </button>
    );
  };

  return (
    <Content title={<Title>基础信息</Title>}>
      <div className="px-4">
        <div className="card-wrapper">
          <Row
            left={
              <>
                <FolderIcon className="h-5 w-5" />
                <span className="ml-2">资源库路径</span>
              </>
            }
            right={library?.path}
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
                <span className="ml-2 flex items-center">最后同步</span>
              </>
            }
            right={
              library?.lastSyncTime?.toLocaleString("zh", { hour12: false }) ??
              "暂未同步"
            }
          />

          <Row
            left={
              <>
                <PhotoIcon className="h-5 w-5" />
                <span className="ml-2">同步数量</span>
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
                <span className="ml-2 flex items-center">预览</span>
              </>
            }
            right={
              config && (
                <div className="dropdown-hover dropdown">
                  <div role="button" tabIndex={0}>
                    {site}
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    className="dropdown-content right-0 rounded-md bg-base-100 p-4 shadow-md"
                  >
                    <QRCodeSVG value={site} />
                  </div>
                </div>
              )
            }
            onRightClick={() => {
              void window.shell.openExternal(site);
            }}
          />
        </div>

        <div className="mt-4 flex py-3">
          <div className="flex w-1/2 justify-center">
            <SyncCircle
              pendingCount={library?.pendingCount ?? 0}
              onListenData={(status) => {
                if (status === "completed") {
                  setDisabled({ sync: false, delete: false });
                } else {
                  setDisabled({ sync: true, delete: true });
                }
              }}
              onSyncData={(status) => {
                if (status === "completed") {
                  setDisabled({ sync: false, delete: false });
                } else {
                  setDisabled({ sync: true, delete: true });
                }
              }}
            />
          </div>
          <div className="w-1/2">
            <div className="m-auto flex h-full w-5/6 flex-col justify-center">
              <SyncButton />
              <button
                disabled={disabled.delete}
                className="btn-error btn-outline btn mt-4"
                onClick={onBeforeDeleteLibrary}
              >
                移除
              </button>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default BasicPage;
