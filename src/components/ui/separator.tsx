
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    animated?: boolean;
  }
>(
  (
    { className, orientation = "horizontal", decorative = true, animated = false, ...props },
    ref
  ) => {
    if (animated) {
      return (
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
          )}
          asChild
          {...props}
        >
          <motion.div
            initial={{ 
              scaleX: orientation === "horizontal" ? 0 : 1, 
              scaleY: orientation === "vertical" ? 0 : 1
            }}
            animate={{ 
              scaleX: 1, 
              scaleY: 1 
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            style={{
              transformOrigin: orientation === "horizontal" ? "left center" : "center top"
            }}
          />
        </SeparatorPrimitive.Root>
      )
    }
  
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
