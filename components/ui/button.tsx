import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "default" | "link" | "destructive" | "secondary", size?: "sm" | "md" | "lg" | "icon" }>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm dark:bg-blue-600 dark:hover:bg-blue-500",
      default: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800",
      ghost: "hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
      link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
      destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700",
    }
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-6 text-lg",
      icon: "h-10 w-10",
    }
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
