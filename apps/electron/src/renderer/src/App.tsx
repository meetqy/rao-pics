import { TRPCReactProvider } from "@rao-pics/trpc";

import Layout from "./Layout";

function App() {
  return (
    <TRPCReactProvider>
      <Layout />
    </TRPCReactProvider>
  );
}

export default App;
