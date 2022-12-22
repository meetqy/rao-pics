import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>文件夹{id}</div>;
};

export default Page;
