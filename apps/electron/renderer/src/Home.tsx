import "./App.css";
import reactLogo from "./assets/react.svg";
import { trpc } from "./utils/trpc";

function Home() {
  const library = trpc.library.get.useQuery();
  const utils = trpc.useContext();
  // const addExample = trpc.example.add.useMutation({
  //   async onSuccess() {
  //     await utils.example.getAll.invalidate();
  //   },
  // });
  // const removeExample = trpc.example.remove.useMutation({
  //   async onSuccess() {
  //     await utils.example.getAll.invalidate();
  //   },
  // });
  const greeting = trpc.greeting.useQuery({ name: "Nicky" });

  return (
    <div className=" bg-base-100">
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="vite.svg" className="logo w-48 h-48" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="logo react w-48 h-48"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-5xl uppercase">{greeting.data}</h1>
      {/* <button onClick={() => addExample.mutate()}>ADD example</button> */}
      <ul>
        {library.data?.map((item, idx) => {
          return (
            <li
              key={idx}
              className="example"
              // onClick={() => {
              //   library.mutate({ id: example.id });
              // }}
            >
              <span className="link link-primary">
                {item.id} - {item.name} - {item.dir}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
