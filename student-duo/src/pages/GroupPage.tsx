import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/appStore'
import Button from '../components/ui/Button'

export default function GroupPage() {
  const { groupId = 'g1' } = useParams()
  const group = useAppStore((s) => s.groups[groupId])
  const students = useAppStore((s) => s.students)
  const files = useAppStore((s) => s.groupFiles[groupId] ?? [])
  const addGroupFile = useAppStore((s) => s.addGroupFile)
  const removeGroupFile = useAppStore((s) => s.removeGroupFile)

  const ranking = (group?.memberIds ?? []).map((id) => students[id]).filter(Boolean).sort((a, b) => (b?.xp ?? 0) - (a?.xp ?? 0))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">{group?.name ?? `Grupo ${groupId}`}</h2>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="font-semibold mb-3">Ranking de participación</div>
        <ul className="space-y-2">
          {ranking.map((m, idx) => (
            <li key={m!.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">{idx + 1}</div>
                <div>
                  <div className="font-semibold">{m!.name}</div>
                  <div className="text-xs text-gray-500">{m!.xp} XP</div>
                </div>
              </div>
              <Button variant="blue">Ver perfil</Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Archivos compartidos</div>
          <Button onClick={() => addGroupFile(groupId, { name: `Archivo ${files.length + 1}.txt`, size: 1234 })}>+ Agregar</Button>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {files.map((f) => (
            <div key={f.id} className="bg-gray-50 px-3 py-2 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold">{f.name}</div>
                <div className="text-xs text-gray-500">{(f.size/1024).toFixed(1)} KB</div>
              </div>
              <Button variant="gray" onClick={() => removeGroupFile(groupId, f.id)}>Eliminar</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

