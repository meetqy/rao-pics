import { type NextPage } from "next";

import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  const library = trpc.library.get.useQuery();

  return (
    <div className="p-10 bg-base-100">
      <button className="btn btn-primary">daisyui btn primary</button>
      {library.data?.map((item) => (
        <p className="text-2xl">{item.name}</p>
      ))}
    </div>
  );
};

export default Home;
