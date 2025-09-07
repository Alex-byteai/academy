import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import KanbanBoard, { type KanbanTask } from '../components/KanbanBoard'
import { useAppStore } from '../store/appStore'
import TaskModal from '../components/forms/TaskModal'
import Button from '../components/ui/Button'

export default function ProjectPage() {
  const { projectId } = useParams()
  const { tasks, moveTaskStatus, hydrate } = useAppStore()
  const [open, setOpen] = useState(false)
  const [columns, setColumns] = useState<Record<'todo' | 'doing' | 'done', KanbanTask[]>>({ todo: [], doing: [], done: [] })

  useEffect(() => { hydrate() }, [hydrate])

  const projectTasks = useMemo(() => Object.values(tasks).filter((t) => t.projectId === projectId), [tasks, projectId])

  useEffect(() => {
    const mapped: Record<'todo' | 'doing' | 'done', KanbanTask[]> = { todo: [], doing: [], done: [] }
    for (const t of projectTasks) mapped[t.status].push({ id: t.id, title: t.title })
    setColumns(mapped)
  }, [projectTasks])

  const onMove = (taskId: string, to: 'todo' | 'doing' | 'done') => { moveTaskStatus(taskId, to) }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold">Proyecto {projectId}</h2>
        {projectId && <Button onClick={() => setOpen(true)}>+ Tarea</Button>}
      </div>
      <KanbanBoard columns={columns} onMove={onMove} />
      <TaskModal open={open} onClose={() => setOpen(false)} projectId={projectId!} />
    </div>
  )
}

