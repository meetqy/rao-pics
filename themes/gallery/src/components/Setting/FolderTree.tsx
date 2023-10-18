import { useRouter } from "next/router";
import { FolderMinusIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";

import { settingSelector } from "~/states/setting";

interface Folder {
  name: string;
  id: string;
  pid: string | null;
  description: string | null;
  passwordTips: string | null;
  children?: Folder[];
}

interface FileTreeProps {
  data: Folder[];
}

function FolderTree({ data }: FileTreeProps) {
  const [setting, setSetting] = useRecoilState(settingSelector);
  const router = useRouter();

  const { layout, openFolderIds } = setting;

  const Document = ({ data }: { data: Folder }) => {
    return (
      <li>
        <span
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
            void router.push(`/${layout}/${data.id}`);
          }}
        >
          <FolderMinusIcon className="h-5 w-5" />
          {data.name}
        </span>
      </li>
    );
  };

  const FolderRoot = ({ data }: { data: Folder }) => {
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
          <summary>
            <FolderOpenIcon className="h-5 w-5" />
            {data.name}
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
    <ul className="menu w-full font-mono text-base">
      {data.map((item) => {
        if (!item.children?.length) {
          return <Document key={item.id} data={item} />;
        } else {
          return <FolderRoot key={item.id} data={item} />;
        }
      })}
    </ul>
  );
}

export default FolderTree;
