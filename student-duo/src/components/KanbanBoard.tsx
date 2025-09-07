import { DndContext, PointerSensor, closestCenter, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import { celebrateSmallWin } from '../utils/confetti'

export type KanbanTask = { id: string; title: string; assignee?: string }

type Props = {
  columns: Record<'todo' | 'doing' | 'done', KanbanTask[]>
  onMove: (taskId: string, to: 'todo' | 'doing' | 'done') => void
}

function SortableItem({ id, title, assignee }: KanbanTask) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  return (
    <motion.li ref={setNodeRef} style={style} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-blue-200" {...attributes} {...listeners}>
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-gray-500">Asignado: {assignee || 'Sin asignar'}</div>
    </motion.li>
  )
}

export default function KanbanBoard({ columns, onMove }: Props) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    let to = (over.data.current as any)?.column as 'todo' | 'doing' | 'done' | undefined
    if (!to) {
      const overId = String(over.id)
      const found = (['todo', 'doing', 'done'] as const).find((k) => columns[k].some((t) => t.id === overId))
      if (found) to = found
    }
    if (to) {
      onMove(String(active.id), to)
      if (to === 'done') celebrateSmallWin()
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['todo', 'doing', 'done'] as const).map((col) => {
          const DroppableColumn = ({ children }: { children: ReactNode }) => {
            const { setNodeRef } = useDroppable({ id: `col-${col}`, data: { column: col } })
            return (
              <div ref={setNodeRef} className="min-h-[120px]">
                {children}
              </div>
            )
          }
          return (
          <Card key={col} className="">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold capitalize">
                {col === 'todo' && 'Pendiente'}
                {col === 'doing' && 'En progreso'}
                {col === 'done' && 'Completado'}
              </h3>
              {col === 'done' ? <Badge color="green">✔</Badge> : null}
            </div>
            <DroppableColumn>
              <SortableContext items={columns[col].map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <ul className="space-y-2">
                  {columns[col].map((task) => (
                    <SortableItem key={task.id} {...task} />
                  ))}
                </ul>
              </SortableContext>
            </DroppableColumn>
          </Card>
        )})}
      </div>
    </DndContext>
  )
}

