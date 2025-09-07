type Props = { name: string; color?: string; size?: number; emoji?: string }

export default function Avatar({ name, color = '#22c55e', size = 40, emoji = '🙂' }: Props) {
  const initials = name?.charAt(0).toUpperCase()
  return (
    <div
      style={{ width: size, height: size, backgroundColor: color }}
      className="rounded-full flex items-center justify-center text-white font-bold"
      title={name}
    >
      <span style={{ fontSize: Math.round(size * 0.5) }}>{emoji || initials}</span>
    </div>
  )
}

