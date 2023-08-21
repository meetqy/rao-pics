import { trpc } from "@renderer/utils/trpc";

function HelloElectron() {
  const { data } = trpc.greeting.useQuery({ name: "Electron" });
  trpc.subscription.useSubscription(undefined, {
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
