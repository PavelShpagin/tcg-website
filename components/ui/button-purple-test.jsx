import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@utils/utils";

// Define the button styling with TailwindCSS for enhanced visuals and animations
const buttonStyles = `
  relative inline-flex items-center justify-center font-bold text-white text-lg
  bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700
  border-2 border-purple-500 hover:border-purple-400
  py-3 px-6 rounded-full shadow-2xl
  transition-all duration-500 ease-in-out
  focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 focus-visible:ring-opacity-50
  before:absolute before:inset-0 before:bg-purple-600/30 before:rounded-full
  before:scale-0 before:opacity-0 before:transition-all before:duration-500
  hover:before:scale-110 hover:before:opacity-100
  active:scale-90 active:bg-purple-800
  overflow-hidden
`;

const Button = React.forwardRef(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonStyles, className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
