import Link from "next/link";
import { FolderMinusIcon, FolderOpenIcon } from "@heroicons/react/24/outline";

import type { SettingType } from "~/states/setting";

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
  layout: SettingType["layout"];
}

function FolderTree({ data, layout }: FileTreeProps) {
  const Document = ({ data }: { data: Folder }) => {
    return (
      <li>
        <Link href={`/${layout}/${data.id}`}>
          <FolderMinusIcon className="h-4 w-4" />
          {data.name}
        </Link>
      </li>
    );
  };

  const FolderRoot = ({ data }: { data: Folder }) => {
    return (
      <li>
        <details>
          <summary>
            <FolderOpenIcon className="h-4 w-4" />
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
