import { type NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    console.log(23);
  });

  return (
    <div className="p-10 bg-base-100">
      Home <button className="btn btn-primary">anniu</button>
    </div>
  );
};

export default Home;
