import { useEffect, useState } from "react";

import { trpc } from "./utils/trpc";

function Home() {
  const utils = trpc.useContext();
  const addLibrary = trpc.library.add.useMutation();

  const { data } = trpc.base.greeting.useQuery({ name: "Electron" });

  trpc.base.subscription.useSubscription(undefined, {
    onData(d) {
      console.log(d);
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div className="h-screen w-full flex text-sm">
      <button className="btn btn-primary">主要按钮</button>
      {data.text}
    </div>
  );
}

export default Home;
