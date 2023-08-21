import HelloElectron from "../components/Hello";
import Versions from "../components/Versions";
import icons from "./assets/icons.svg";

function Home(): JSX.Element {
  return (
    <div className="container bg-amber-600">
      <HelloElectron />
      <Versions></Versions>

      <svg className="hero-logo" viewBox="0 0 900 300">
        <use xlinkHref={`${icons}#electron`} />
      </svg>
    </div>
  );
}

export default Home;
