import Image from "next/image";

interface LogoProps {
  className?: string;
  htmlFor?: string;
}

const Logo = ({ className, htmlFor }: LogoProps) => {
  return (
    <div className={`flex rounded-md lg:px-2 ${className}`}>
      <div className="relative hidden h-10 w-10 lg:block lg:h-12 lg:w-12">
        <Image alt="Rao Pics logo" fill src="/icon.png" draggable={false} className="rounded-full" />
      </div>
      <label htmlFor={htmlFor} className="flex-0 btn btn-ghost font-mono text-xl font-bold capitalize hover:bg-transparent md:text-3xl">
        <span className="text-primary">rao</span>
        <span>.</span>
        <span>pics</span>
      </label>
    </div>
  );
};

export default Logo;
