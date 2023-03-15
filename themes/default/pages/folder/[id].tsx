import { useRouter } from "next/router";
import Page, { PageHandle } from "..";
import { createRef, useEffect, useState } from "react";

const FolderPage = () => {
  const router = useRouter();
  const pageRef = createRef<PageHandle>();
  const [lastId, setLastId] = useState<string>();

  const { id } = router.query;

  useEffect(() => {
    if (id && lastId != id) {
      setLastId(id as string);
      pageRef.current?.reload();
    }
  }, [id, pageRef, lastId]);

  return <Page ref={pageRef} more={{ folders: { some: { id: { in: id } } } }} />;
};

export default FolderPage;
