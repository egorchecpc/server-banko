import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        primary:
          'bg-blue-1000 text-white hover:bg-blue-1000/40 hover:text-white',
        outline: 'border border-grey-600 bg-white hover:bg-grey-400',
        secondary: 'bg-blue-1000/30 text-blue-1000 hover:bg-blue-1000/40',
        icon: 'bg-white text-grey-900 shadow-sm shadow-grey-300 hover:bg-grey-400 hover:text-black-1000',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        export: 'bg-transparent text-blue-1000 hover:text-blue-1000/40',
        table_header: 'font-bold text-black-1000',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-4 w-4',
        lg: 'h-10 rounded-lg px-8',
        icon: 'h-7.5 w-7.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
