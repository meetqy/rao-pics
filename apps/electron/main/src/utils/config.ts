import { getPort } from "get-port-please";
import ip from "ip";

import curd from "@acme/curd";

/**
 * 获取并且更新配置
 */
export const getAndUpdateConfig = async (): Promise<{
  ip: string;
  webPort: number;
  assetsPort: number;
}> => {
  const _ip = ip.address();
  const _web_port = Number(process.env["WEB_PORT"]) || (await getPort({ portRange: [9620, 9624], port: 9620 }));
  const _assets_port = Number(process.env["ASSETS_PORT"]) || (await getPort({ portRange: [9625, 9629], port: 9625 }));

  process.env["IP"] = _ip;
  process.env["WEB_PORT"] = _web_port.toString();
  process.env["ASSETS_PORT"] = _assets_port.toString();

  try {
    await curd.config.update({
      ip: _ip,
      webPort: _web_port,
      assetsPort: _assets_port,
    });
  } catch (e) {
    process.exit(1);
  }

  return {
    ip: _ip,
    webPort: _web_port,
    assetsPort: _assets_port,
  };
};
