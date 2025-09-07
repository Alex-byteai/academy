import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useAppStore, type Task } from '../../store/appStore'

type Props = {
  open: boolean
  onClose: () => void
  projectId: string
  initial?: Partial<Task>
}

export default function TaskModal({ open, onClose, projectId, initial }: Props) {
  const addTask = useAppStore((s) => s.addTask)
  const updateTask = useAppStore((s) => s.updateTask)
  const [title, setTitle] = useState(initial?.title ?? '')
  const [status, setStatus] = useState<Task['status']>(initial?.status ?? 'todo')
  const isEdit = Boolean(initial?.id)

  const onSubmit = () => {
    if (!title.trim()) return
    if (isEdit && initial?.id) {
      updateTask(initial.id, { title, status })
    } else {
      addTask({ title, projectId, status })
    }
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Editar tarea' : 'Nueva tarea'}>
      <div className="space-y-3">
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="w-full border rounded-xl px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as Task['status'])}>
          <option value="todo">Pendiente</option>
          <option value="doing">En progreso</option>
          <option value="done">Completado</option>
        </select>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="gray" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit}>{isEdit ? 'Guardar' : 'Crear'}</Button>
        </div>
      </div>
    </Modal>
  )
}

