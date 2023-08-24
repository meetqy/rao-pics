import { AsideCount } from "@renderer/components/AsideCount";
import { Content } from "@renderer/components/Content";

const Home = () => {
  return (
    <>
      {/* aside */}
      <div className="w-1/4 bg-base-200/70">
        <AsideCount imageCount={1300000} mediaCount={9909900} />
      </div>
      <div className="relative flex-1 p-4 pt-1">
        <Content />
      </div>
    </>
  );
};

export default Home;
