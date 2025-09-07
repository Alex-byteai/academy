import { create } from 'zustand'

export type Student = { id: string; name: string; avatarColor?: string }
export type Task = { id: string; title: string; status: 'todo' | 'doing' | 'done'; assigneeId?: string; projectId: string }
export type Project = { id: string; name: string; color: string; emoji: string }
export type Group = { id: string; name: string; memberIds: string[] }

type State = {
  students: Record<string, Student>
  projects: Record<string, Project>
  tasks: Record<string, Task>
  groups: Record<string, Group>
}

type Actions = {
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  hydrate: () => void
}

const STORAGE_KEY = 'sd_state_v1'

const initialState: State = {
  students: { me: { id: 'me', name: 'Estudiante', avatarColor: '#22c55e' } },
  projects: {
    p1: { id: 'p1', name: 'Proyecto Matemáticas', color: 'bg-green-400', emoji: '📘' },
  },
  tasks: {
    t1: { id: 't1', title: 'Investigar tema', status: 'todo', projectId: 'p1' },
    t2: { id: 't2', title: 'Definir entregables', status: 'todo', projectId: 'p1' },
    t3: { id: 't3', title: 'Escribir introducción', status: 'doing', projectId: 'p1' },
    t4: { id: 't4', title: 'Crear repositorio', status: 'done', projectId: 'p1' },
  },
  groups: {
    g1: { id: 'g1', name: 'Grupo 1', memberIds: ['me'] },
  },
}

export const useAppStore = create<State & Actions>((set, get) => ({
  ...initialState,
  addTask: (task) => set((state) => ({ tasks: { ...state.tasks, [task.id]: task } })),
  updateTask: (id, updates) => set((state) => ({ tasks: { ...state.tasks, [id]: { ...state.tasks[id], ...updates } } })),
  deleteTask: (id) => set((state) => { const { [id]: _, ...rest } = state.tasks; return { tasks: rest } }),
  hydrate: () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      set(parsed)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()))
    }
  },
}))

useAppStore.subscribe((state) => {
  try {
    const toPersist: State = { students: state.students, projects: state.projects, tasks: state.tasks, groups: state.groups }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist))
  } catch {}
})

