import type { PropsWithChildren } from 'react'
import clsx from 'classnames'

type Props = PropsWithChildren<{ color?: 'green' | 'blue' | 'yellow' | 'gray'; className?: string }>

export default function Badge({ children, color = 'green', className }: Props) {
  const colors = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-amber-100 text-amber-800',
    gray: 'bg-gray-100 text-gray-800',
  }[color]
  return (
    <span className={clsx('px-2.5 py-1 rounded-full text-xs font-bold', colors, className)}>{children}</span>
  )
}

