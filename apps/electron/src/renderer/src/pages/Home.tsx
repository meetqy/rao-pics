import HelloElectron from "../components/Hello";
import Versions from "../components/Versions";

function Home(): JSX.Element {
  return (
    <div className="h-screen w-screen bg-base-100">
      <HelloElectron />
      <Versions></Versions>

      <button className="btn-primary btn m-4">Add User</button>

      <div className="px-4">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
