interface LogoProps {
  className?: string;
  htmlFor?: string;
}

const Logo = ({ className, htmlFor }: LogoProps) => {
  return (
    <div className={`rounded-md flex px-2 ${className}`}>
      <img src="/icon.png" draggable={false} className="xl:h-12 h-10" />
      <label htmlFor={htmlFor} className="flex-0 btn btn-ghost md:text-3xl xl:text-4xl hover:bg-transparent capitalize font-mono font-bold">
        <span className="text-primary">rao</span>
        <span>.</span>
        <span>pics</span>
      </label>
    </div>
  );
};

export default Logo;
