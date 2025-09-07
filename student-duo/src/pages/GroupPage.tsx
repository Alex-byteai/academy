import { useParams } from 'react-router-dom'

const members = [
  { id: 'm1', name: 'Ana', score: 120 },
  { id: 'm2', name: 'Luis', score: 95 },
  { id: 'm3', name: 'Sofía', score: 80 },
]

export default function GroupPage() {
  const { groupId } = useParams()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">Grupo {groupId}</h2>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="font-semibold mb-3">Ranking de participación</div>
        <ul className="space-y-2">
          {members.sort((a, b) => b.score - a.score).map((m, idx) => (
            <li key={m.id} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold">{idx + 1}</div>
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.score} pts</div>
                </div>
              </div>
              <button className="text-sm px-3 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white">Ver perfil</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow">
        <div className="font-semibold mb-2">Archivos compartidos</div>
        <div className="text-sm text-gray-500">(Repositorio local, próximamente)</div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {['Guía.pdf', 'Plan.xlsx', 'Borrador.docx'].map((name) => (
            <div key={name} className="bg-gray-50 px-3 py-2 rounded-xl">{name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

