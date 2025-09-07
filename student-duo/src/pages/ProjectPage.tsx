import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import KanbanBoard, { type KanbanTask } from '../components/KanbanBoard'
import { useAppStore } from '../store/appStore'

export default function ProjectPage() {
  const { projectId } = useParams()
  const { tasks, updateTask, hydrate } = useAppStore()
  const [columns, setColumns] = useState<Record<'todo' | 'doing' | 'done', KanbanTask[]>>({ todo: [], doing: [], done: [] })

  useEffect(() => { hydrate() }, [hydrate])

  const projectTasks = useMemo(() => Object.values(tasks).filter((t) => t.projectId === projectId), [tasks, projectId])

  useEffect(() => {
    const mapped: Record<'todo' | 'doing' | 'done', KanbanTask[]> = { todo: [], doing: [], done: [] }
    for (const t of projectTasks) mapped[t.status].push({ id: t.id, title: t.title })
    setColumns(mapped)
  }, [projectTasks])

  const onMove = (taskId: string, to: 'todo' | 'doing' | 'done') => {
    updateTask(taskId, { status: to })
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-4">Proyecto {projectId}</h2>
      <KanbanBoard columns={columns} onMove={onMove} />
    </div>
  )
}

