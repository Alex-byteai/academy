import type { Student } from '../store/appStore'

export type Badge = { id: string; name: string; emoji: string; earned: boolean }

export function getBadgesFor(student: Student): Badge[] {
  const list: Badge[] = [
    { id: 'starter', name: 'Primer paso', emoji: '🎉', earned: student.xp >= 10 },
    { id: 'focused', name: 'Enfocado', emoji: '⏱️', earned: student.streak >= 3 },
    { id: 'finisher', name: 'Finalizador', emoji: '✅', earned: student.tasksCompleted >= 5 },
  ]
  return list
}

