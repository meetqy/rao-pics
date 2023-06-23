import Alert from "./components/Alert";
import { trpc } from "./utils/trpc";

function HelloElectron() {
  const utils = trpc.useContext();
  const addLibrary = trpc.library.add.useMutation();

  const chooseFolder = async () => {
    const res = await window.electronAPI.library.choose();

    if (!res) return Alert.open("暂时不支持此App/文件夹");

    addLibrary.mutateAsync(res);

    // if (res) {
    //   const f = await addLibrary.mutateAsync(res);
    //   console.log(f);
    //   // setActive(f.id);
    // }
  };

  const { data } = trpc.base.greeting.useQuery({ name: "Electron" });
  trpc.base.subscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data);
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <p>
        <button onClick={chooseFolder}>选择文件夹</button>
      </p>
      {data.text}
    </div>
  );
}

export default HelloElectron;
