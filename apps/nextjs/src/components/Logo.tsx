import Image from "next/image";

interface LogoProps {
  className?: string;
  htmlFor?: string;
}

const Logo = ({ className, htmlFor }: LogoProps) => {
  return (
    <div className={`rounded-md flex lg:px-2 ${className}`}>
      <Image alt="Rao Pics logo" src="/icon.png" draggable={false} className="lg:h-12 h-10 lg:block hidden rounded-full shadow" />
      <label htmlFor={htmlFor} className="flex-0 btn btn-ghost text-xl md:text-3xl hover:bg-transparent capitalize font-mono font-bold">
        <span className="text-primary">rao</span>
        <span>.</span>
        <span>pics</span>
      </label>
    </div>
  );
};

export default Logo;
