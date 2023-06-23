import { trpc } from "./utils/trpc";

function HelloElectron() {
  const utils = trpc.useContext();
  const addLibrary = trpc.library.add.useMutation();

  const { data } = trpc.base.greeting.useQuery({ name: "Electron" });
  trpc.base.subscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data);
    },
  });

  if (!data) {
    return null;
  }

  return <div>{data.text}</div>;
}

export default HelloElectron;
