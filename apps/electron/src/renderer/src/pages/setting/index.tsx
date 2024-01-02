import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  DevicePhoneMobileIcon,
  FolderMinusIcon,
  LinkIcon,
  ServerIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";

import { trpc } from "@rao-pics/trpc";

import "./index.css";

import Row from "@renderer/components/Row";

const SettingPage = () => {
  const utils = trpc.useUtils();

  const configUpsert = trpc.config.upsert.useMutation({
    onSuccess() {
      void utils.config.invalidate();
    },
  });

  const { data: config } = trpc.config.findUnique.useQuery();

  return (
    <Content title={<Title>通用</Title>}>
      <div className="px-4 pb-4">
        {/* 显示相关 */}
        <div className="card-wrapper mt-4">
          <Row
            left={
              <>
                <TrashIcon className="h-5 w-5" />
                <span className="ml-2">回收站</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
                value={config?.trash ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    trash: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>不显示</option>
                <option value={1}>显示</option>
              </select>
            }
          />

          <Row
            left={
              <>
                <FolderMinusIcon className="h-5 w-5" />
                <span className="ml-2">加密文件夹</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
                value={config?.pwdFolder ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    pwdFolder: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>不显示</option>
                <option value={1}>显示</option>
              </select>
            }
          />
        </div>

        {/* 同步相关 */}
        <div className="card-wrapper mt-4">
          <Row
            left={
              <>
                <ArrowsRightLeftIcon className="h-5 w-5" />
                <span className="ml-2">启动时对比资源库</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
                value={config?.startDiffLibrary ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    startDiffLibrary: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>关闭</option>
                <option value={1}>打开</option>
              </select>
            }
          />
          <Row
            left={
              <>
                <ArrowPathIcon className="h-5 w-5" />
                <span className="ml-2">自动同步</span>
              </>
            }
            right={
              <select
                className="custom-select w-auto"
                value={config?.autoSync ? 1 : 0}
                onChange={(e) => {
                  configUpsert.mutate({
                    autoSync: Number(e.target.value) === 1,
                  });
                }}
              >
                <option value={0}>关闭</option>
                <option value={1}>打开</option>
              </select>
            }
          />
        </div>

        {/* 自定义域名 */}
        <div className="card-wrapper mt-4">
          <Row
            left={
              <>
                <LinkIcon className="h-5 w-5" />
                <span className="ml-2 flex items-center">自定义域名</span>
              </>
            }
            right={
              <input
                defaultValue={config?.clientSite ?? undefined}
                onBlur={(e) => {
                  const value = e.target.value.trim();
                  // 校验域名
                  if (value && !/^((https|http)?:\/\/)[^\s]+/.test(value)) {
                    window.dialog.showErrorBox(
                      "自定义域名",
                      "请输入正确的域名",
                    );
                    return;
                  }
                  configUpsert.mutate({
                    clientSite: e.target.value,
                  });
                }}
                className="input input-ghost input-sm w-full !pr-0 text-right font-mono transition-all focus:!pr-4 focus:outline-none"
                placeholder="输入域名，清空则使用默认值"
              />
            }
          />

          <Row
            left={
              <>
                <DevicePhoneMobileIcon className="h-5 w-5" />
                <span className="ml-2 flex items-center">网页端口</span>
              </>
            }
            right={config?.clientPort}
          />

          <Row
            left={
              <>
                <ServerIcon className="h-5 w-5" />
                <span className="ml-2 flex items-center">服务端口</span>
              </>
            }
            right={config?.serverPort}
          />
        </div>
      </div>
    </Content>
  );
};

export default SettingPage;
