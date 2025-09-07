import type { ButtonHTMLAttributes } from 'react'
import clsx from 'classnames'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'green' | 'blue' | 'yellow' | 'gray'
  rounded?: 'full' | 'xl'
}

export default function Button({ className, variant = 'green', rounded = 'full', ...props }: Props) {
  const color = {
    green: 'bg-green-500 hover:bg-green-600 text-white',
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    yellow: 'bg-amber-500 hover:bg-amber-600 text-white',
    gray: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  }[variant]
  const radius = rounded === 'full' ? 'rounded-full' : 'rounded-xl'
  return (
    <button {...props} className={clsx('px-4 py-2 font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]', color, radius, className)} />
  )
}

