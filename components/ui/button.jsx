import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ClipLoader } from "react-spinners";

import { cn } from "@lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center font-bold text-lg py-2 px-6 rounded-xl transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 overflow-hidden tracking-wider whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "", //"bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-primary text-primary-foreground hover:bg-primary/90", //"bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-9 rounded-xl px-3",
        md: "h-10 rounded-xl px-4 py-2",
        lg: "h-11 rounded-xl px-8",
        //xl: "rounded-full py-3 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ClipLoader size={20} color={"#fff"} loading={loading} />
          </div>
        )}
        <span className={loading ? "invisible" : ""}>{children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
