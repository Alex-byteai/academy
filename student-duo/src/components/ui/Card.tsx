import type { PropsWithChildren } from 'react'
import clsx from 'classnames'

type Props = PropsWithChildren<{ className?: string }>

export default function Card({ children, className }: Props) {
  return (
    <div className={clsx('bg-white rounded-2xl p-4 card-shadow', className)}>
      {children}
    </div>
  )
}

