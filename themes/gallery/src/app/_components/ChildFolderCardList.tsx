import type { ReactNode } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { useRecoilValue } from "recoil";

import { settingSelector } from "~/states/setting";
import { trpc } from "~/utils/trpc";

const ChildFolderCardList = ({ folderId }: { folderId: string }) => {
  const router = useRouter();
  const setting = useRecoilValue(settingSelector);

  const { layout } = setting;

  const { data: folder } = trpc.folder.findUnique.useQuery({
    id: folderId,
    include: ["children"],
  });

  const { data: config } = trpc.config.findUnique.useQuery();

  const children = folder?.children ?? [];

  return (
    children.length > 0 && (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {children.map((child) => {
          const Card = (props: { children?: ReactNode }) => {
            return (
              <div
                onClick={() => {
                  void router.push(`/${layout}?m=${child.id}`);
                }}
                aria-hidden
                key={child.id}
                className="group relative flex aspect-square w-full cursor-pointer items-end justify-center overflow-hidden rounded-md border border-base-content/10 bg-base-200/30 p-2"
              >
                <div className="relative z-10 w-full overflow-hidden rounded-md bg-base-100/70 py-2 text-center backdrop-blur-sm">
                  <p className="text-base font-medium">{child.name}</p>
                  <p className="mt-1 text-xs text-base-content/70">
                    {child._count.images
                      ? `${child._count.images} 个文件`
                      : "查看子文件夹"}
                  </p>
                </div>

                {props.children}
              </div>
            );
          };

          const image = child.images?.[0];
          if (!image || !config) {
            return (
              <Card key={child.id}>
                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral pb-14 transition-all ease-in-out">
                  <LightBulbIcon className="h-24 w-24 text-neutral-content" />
                </div>
              </Card>
            );
          }

          const id = image.path.split(/\/|\\/).slice(-2)[0];
          const host = `http://${config.ip}:${config.clientPort}`;
          const src = `${host}/static/${id}/${image.name}.${image.ext}`;
          const thumbnailPath = image.noThumbnail
            ? src
            : `${host}/static/${id}/${image.name}_thumbnail.png`;

          return (
            <Card key={child.id}>
              <Image
                src={thumbnailPath}
                className="absolute left-0 top-0 h-full w-full object-cover object-center transition-all ease-in-out"
                layout="fill"
              />
            </Card>
          );
        })}
      </div>
    )
  );
};

export default ChildFolderCardList;
