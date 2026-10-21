import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        brand:
          "bg-primary text-primary-foreground font-semibold tracking-[0.02em] rounded-[12px] shadow-rest transition-all duration-200 hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-raised active:translate-y-0 active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-espresso disabled:bg-border disabled:text-muted-foreground disabled:opacity-100",
        brandOutline:
          "border-2 border-espresso text-espresso bg-transparent font-semibold tracking-[0.02em] rounded-[12px] transition-all duration-200 hover:bg-espresso hover:text-linen active:scale-[0.98]",
        onDark:
          "bg-card text-espresso font-semibold tracking-[0.02em] rounded-[12px] transition-all duration-200 hover:bg-secondary hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-linen",
        onDarkOutline:
          "border-2 border-card text-card bg-transparent font-semibold tracking-[0.02em] rounded-[12px] transition-all duration-200 hover:bg-card hover:text-espresso active:scale-[0.98] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-linen",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        brand: "h-[52px] px-6 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
