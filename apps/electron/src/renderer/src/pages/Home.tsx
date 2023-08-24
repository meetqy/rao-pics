import { AsideCount } from "@renderer/components/AsideCount";

const Home = () => {
  return (
    <>
      {/* aside */}
      <div className="w-1/4 bg-base-200/70">
        <AsideCount imageCount={1300000} mediaCount={9909900} />
      </div>
      <div className="relative flex-1 px-4">
        <button
          className="btn"
          onClick={() => {
            void window.dialog.showMessageBox({
              type: "error",
              title: "info",
              message: "hello world",
            });
          }}
        >
          showMessageBox
        </button>
      </div>
    </>
  );
};

export default Home;
