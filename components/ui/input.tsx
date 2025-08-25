import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-blue-500 selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-gray-700 dark:bg-gray-800/30 dark:selection:bg-blue-400 dark:selection:text-gray-900 dark:file:text-gray-100 dark:placeholder:text-gray-400',
        'focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/20 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/30',
        'aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-400/30',
        className
      )}
      {...props}
    />
  )
}

export { Input }
