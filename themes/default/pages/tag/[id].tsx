import { useRouter } from "next/router";
import Page from "../index";

const TagPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Page more={{ tags: { some: { id: id as string } } }} />;
};

export default TagPage;
