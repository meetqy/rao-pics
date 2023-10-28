import { useRouter } from "next/router";
import {
  FolderMinusIcon,
  FolderOpenIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

import { settingSelector } from "~/states/setting";
import PasswordModal from "./PasswordModal";

interface Folder {
  name: string;
  id: string;
  pid: string | null;
  description: string | null;
  passwordTips: string | null;
  password: string | null;
  children?: Folder[];
  _count: {
    images: number;
  };
}

interface FileTreeProps {
  data: Folder[];
}

function FolderTree({ data }: FileTreeProps) {
  const [setting, setSetting] = useRecoilState(settingSelector);
  const router = useRouter();

  const { layout, openFolderIds } = setting;
  const { folderId } = router.query;

  const Document = ({ data }: { data: Folder }) => {
    return (
      <li className="flex justify-between">
        <div
          className="flex justify-between"
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
            if (folderId === data.id) {
              return;
            }
            void router.push(`/${layout}/${data.id}`);
          }}
        >
          <span className="flex items-center">
            {data.password ? (
              <LockClosedIcon className="mr-1 h-5 w-5" />
            ) : (
              <FolderMinusIcon className="mr-1 h-5 w-5" />
            )}

            {data.name}
          </span>

          <span className="text-sm font-normal text-base-content/30">
            {data._count.images}
          </span>
        </div>
      </li>
    );
  };

  // 父级文件夹
  const FolderRoot = ({ data }: { data: Folder }) => {
    const allCount = data.children?.reduce((a, b) => a + b._count.images, 0);

    return (
      <li>
        <details
          open={openFolderIds.includes(data.id)}
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
            setSetting((prev) => ({
              ...prev,
              openFolderIds: prev.openFolderIds.includes(data.id)
                ? prev.openFolderIds.filter((id) => id !== data.id)
                : [...prev.openFolderIds, data.id],
            }));
          }}
        >
          <summary className="relative flex">
            <div
              className="absolute left-0 top-0 z-50 h-full w-10/12"
              aria-hidden
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                if (data.password === "***") {
                  return PasswordModal.open({
                    passwordTips: "nsfw",
                    onOk: (password, setVisible) => {
                      console.log(password);
                      setVisible(false);
                    },
                  });
                }

                if (folderId === data.id) {
                  return;
                }

                void router.push(`/${layout}/${data.id}`);
              }}
            />
            <div className="flex flex-1 items-center">
              {data.password ? (
                <LockClosedIcon className="mr-1 h-5 w-5" />
              ) : (
                <FolderOpenIcon className="mr-1 h-5 w-5" />
              )}

              {data.name}
            </div>
            <span className="text-sm text-base-content/30">{allCount}</span>
          </summary>
          <ul>
            {data.children?.map((item) => {
              if (!item.children?.length) {
                return <Document key={item.id} data={item} />;
              } else {
                return <FolderRoot key={item.id} data={item} />;
              }
            })}
          </ul>
        </details>
      </li>
    );
  };

  return (
    <>
      <ul className="menu w-full font-mono text-base">
        {data.map((item) => {
          if (!item.children?.length) {
            return <Document key={item.id} data={item} />;
          } else {
            return <FolderRoot key={item.id} data={item} />;
          }
        })}
      </ul>
    </>
  );
}

export default FolderTree;
