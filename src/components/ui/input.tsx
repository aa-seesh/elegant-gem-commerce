
import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  animated?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, animated = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    const inputClassNames = cn(
      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold disabled:cursor-not-allowed disabled:opacity-50",
      className
    );
    
    if (animated) {
      return (
        <div className="relative">
          <motion.input
            type={type}
            className={inputClassNames}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props as HTMLMotionProps<"input">}
            ref={ref as React.Ref<HTMLInputElement>}
          />
          {isFocused && (
            <motion.div 
              layoutId="input-focus-ring"
              className="absolute -inset-px rounded-md border-2 border-gold pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      );
    }
    
    return (
      <input
        type={type}
        className={inputClassNames}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
