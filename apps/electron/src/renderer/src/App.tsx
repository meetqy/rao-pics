import { TRPCReactProvider } from "@rao-pics/trpc/src/TRPCReactProvider";

import Layout from "./Layout";

function App() {
  return (
    <TRPCReactProvider electron>
      <Layout />
    </TRPCReactProvider>
  );
}

export default App;
