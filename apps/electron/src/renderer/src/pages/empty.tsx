import Content from "@renderer/components/Content";
import Title from "@renderer/components/Title";

import { PRODUCT_NAME } from "@rao-pics/constant";

const Empty = () => {
  return (
    <Content title={<Title />}>
      <div className="flex h-full select-none flex-col items-center justify-center px-4 pb-12">
        <p className="font-serif text-7xl font-bold">
          {PRODUCT_NAME.replace(" ", ".")}
        </p>
        <p className="mt-2 text-center text-base text-base-content/90">
          基于 Eagle、PixCall、Billfish 素材管理工具，
          <br />
          让你在任何设备上访问素材。
        </p>
        <button className="btn-primary btn mt-8 w-2/5">添加资源库</button>
      </div>
    </Content>
  );
};

export default Empty;
