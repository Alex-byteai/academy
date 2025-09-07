import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useAppStore, type Project } from '../../store/appStore'

type Props = {
  open: boolean
  onClose: () => void
  initial?: Partial<Project>
}

export default function ProjectModal({ open, onClose, initial }: Props) {
  const addProject = useAppStore((s) => s.addProject)
  const updateProject = useAppStore((s) => s.updateProject)
  const [name, setName] = useState(initial?.name ?? '')
  const [emoji, setEmoji] = useState(initial?.emoji ?? '📘')
  const [color, setColor] = useState(initial?.color ?? 'bg-green-400')
  const isEdit = Boolean(initial?.id)

  const onSubmit = () => {
    if (!name.trim()) return
    if (isEdit && initial?.id) updateProject(initial.id, { name, emoji, color })
    else addProject({ name, emoji, color })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Editar proyecto' : 'Nuevo proyecto'}>
      <div className="space-y-3">
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex items-center gap-2">
          <input className="w-20 border rounded-xl px-3 py-2" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
          <select className="flex-1 border rounded-xl px-3 py-2" value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="bg-green-400">Verde</option>
            <option value="bg-blue-400">Azul</option>
            <option value="bg-yellow-400">Amarillo</option>
            <option value="bg-purple-400">Morado</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="gray" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit}>{isEdit ? 'Guardar' : 'Crear'}</Button>
        </div>
      </div>
    </Modal>
  )
}

