import { Button } from "@components/ui/button";

const buttonStyles = `
  relative inline-flex items-center justify-center font-bold text-white text-lg
  bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-800
  border-2 border-purple-300/40 hover:border-purple-200/60
  py-3 px-8 rounded-xl
  transition-all duration-300 ease-out
  shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]
  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/80
  before:absolute before:inset-0 
  before:bg-gradient-to-r before:from-purple-500/30 before:to-indigo-500/30
  before:rounded-xl before:opacity-0 
  before:transition-opacity before:duration-300
  hover:before:opacity-100
  after:absolute after:inset-0
  after:bg-[url('https://assets.codepen.io/13471/sparkles.gif')]
  after:bg-cover after:opacity-60
  after:rounded-xl after:mix-blend-soft-light
  active:scale-95 active:shadow-inner
  overflow-hidden
  backdrop-blur-sm
  hover:-translate-y-0.5
  tracking-wider
`;

const ButtonPurple = ({ children }) => {
  return <Button className={buttonStyles}>{children}</Button>;
};

export default ButtonPurple;
