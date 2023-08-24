import { NavBar } from "@renderer/components/NavBar";
import { trpc } from "@renderer/utils/trpc";

import HelloElectron from "../components/Hello";
import Versions from "../components/Versions";

function Home(): JSX.Element {
  const utils = trpc.useContext();

  const createUser = trpc.createUser.useMutation({
    onSuccess: () => utils.getUsers.invalidate(),
  });

  const { data: users } = trpc.getUsers.useQuery();

  const deleteUser = trpc.deleteUser.useMutation({
    onSuccess: () => utils.getUsers.invalidate(),
  });

  return (
    <div className="h-screen w-screen">
      <NavBar name="Home" platform={"darwin"} />

      <HelloElectron />
      <Versions />

      <button
        className="btn-primary btn m-4"
        onClick={() => {
          const num = Math.floor(Math.random() * 1000);
          createUser.mutate({
            name: "Cy Ganderton - " + num.toString(),
            email: `${num.toString()}@qq.com`,
          });
        }}
      >
        Add User
      </button>

      <div className="px-4">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, index) => (
                <tr key={item.email}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn-error btn-sm btn"
                      onClick={() =>
                        deleteUser.mutate({
                          id: item.id,
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
