import { getPort } from "get-port-please";
import ip from "ip";

import eLog from "./log";
import { trpc } from "./trpc";

/**
 * 获取并且更新配置
 */
export const getAndUpdateConfig = async () => {
  const _ip = ip.address();
  const _web_port = await getPort({ portRange: [9620, 9624], port: 9620 });
  const _assets_port = await getPort({ portRange: [9625, 9629], port: 9625 });

  process.env["IP"] = _ip;
  process.env["WEB_PORT"] = _web_port.toString();
  process.env["ASSETS_PORT"] = _assets_port.toString();

  try {
    await trpc.config.update.mutate({
      ip: _ip,
      webPort: _web_port,
      assetsPort: _assets_port,
    });
  } catch (e) {
    eLog.error("main/utils", e);
    process.exit(1);
  }

  return {
    ip: _ip,
    webPort: _web_port,
    assetsPort: _assets_port,
  };
};
