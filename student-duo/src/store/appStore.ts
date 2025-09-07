import { create } from 'zustand'

export type Student = { id: string; name: string; avatarColor?: string; xp: number; streak: number; lastActiveISO?: string; tasksCompleted: number }
export type Task = { id: string; title: string; status: 'todo' | 'doing' | 'done'; assigneeId?: string; projectId: string; createdAtISO?: string; dueAtISO?: string }
export type Project = { id: string; name: string; color: string; emoji: string }
export type Group = { id: string; name: string; memberIds: string[] }
export type FileMeta = { id: string; name: string; size: number; uploadedAtISO: string }

type State = {
  students: Record<string, Student>
  projects: Record<string, Project>
  tasks: Record<string, Task>
  groups: Record<string, Group>
  groupFiles: Record<string, FileMeta[]>
}

type Actions = {
  hydrate: () => void
  // Student
  setStudentName: (id: string, name: string) => void
  setAvatarColor: (id: string, color: string) => void
  addXP: (id: string, amount: number) => void
  // Project CRUD
  addProject: (p: Omit<Project, 'id'>) => string
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  // Task CRUD
  addTask: (t: Omit<Task, 'id' | 'status'> & { status?: Task['status'] }) => string
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTaskStatus: (id: string, status: Task['status']) => void
  // Group files
  addGroupFile: (groupId: string, meta: Omit<FileMeta, 'id' | 'uploadedAtISO'>) => string
  removeGroupFile: (groupId: string, fileId: string) => void
}

const STORAGE_KEY = 'sd_state_v2'

function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`
}

const initialState: State = {
  students: { me: { id: 'me', name: 'Estudiante', avatarColor: '#22c55e', xp: 0, streak: 0, tasksCompleted: 0 } },
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
  groupFiles: { g1: [] },
}

export const useAppStore = create<State & Actions>((set, get) => ({
  ...initialState,
  hydrate: () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      set(parsed)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(get()))
    }
  },
  setStudentName: (id, name) => set((s) => ({ students: { ...s.students, [id]: { ...s.students[id], name } } })),
  setAvatarColor: (id, color) => set((s) => ({ students: { ...s.students, [id]: { ...s.students[id], avatarColor: color } } })),
  addXP: (id, amount) => set((s) => {
    const st = s.students[id]
    const now = new Date()
    const today = now.toISOString().slice(0, 10)
    let streak = st.streak
    if (!st.lastActiveISO) streak = 1
    else {
      const last = new Date(st.lastActiveISO)
      const diffDays = Math.floor((now.getTime() - new Date(last.toDateString()).getTime()) / 86400000)
      if (diffDays === 0) streak = st.streak
      else if (diffDays === 1) streak = st.streak + 1
      else streak = 1
    }
    return { students: { ...s.students, [id]: { ...st, xp: st.xp + amount, streak, lastActiveISO: today } } }
  }),
  addProject: (p) => {
    const id = generateId('p')
    set((s) => ({ projects: { ...s.projects, [id]: { id, ...p } } }))
    return id
  },
  updateProject: (id, updates) => set((s) => ({ projects: { ...s.projects, [id]: { ...s.projects[id], ...updates } } })),
  deleteProject: (id) => set((s) => {
    const { [id]: _, ...rest } = s.projects
    const remainingTasks = Object.fromEntries(Object.entries(s.tasks).filter(([, t]) => t.projectId !== id))
    return { projects: rest, tasks: remainingTasks }
  }),
  addTask: (t) => {
    const id = generateId('t')
    set((s) => ({ tasks: { ...s.tasks, [id]: { id, status: t.status ?? 'todo', createdAtISO: new Date().toISOString(), ...t } } }))
    return id
  },
  updateTask: (id, updates) => set((s) => ({ tasks: { ...s.tasks, [id]: { ...s.tasks[id], ...updates } } })),
  deleteTask: (id) => set((s) => { const { [id]: _, ...rest } = s.tasks; return { tasks: rest } }),
  moveTaskStatus: (id, status) => set((s) => {
    const before = s.tasks[id]
    const after = { ...before, status }
    // reward XP if moving to done
    const updates: Partial<State> = { tasks: { ...s.tasks, [id]: after } }
    if (status === 'done') {
      const me = s.students['me']
      updates.students = { ...s.students, me: { ...me, xp: me.xp + 10, tasksCompleted: me.tasksCompleted + 1 } }
    }
    return updates as State
  }),
  addGroupFile: (groupId, meta) => {
    const id = generateId('f')
    set((s) => ({ groupFiles: { ...s.groupFiles, [groupId]: [ ...(s.groupFiles[groupId] ?? []), { id, uploadedAtISO: new Date().toISOString(), ...meta } ] } }))
    return id
  },
  removeGroupFile: (groupId, fileId) => set((s) => ({ groupFiles: { ...s.groupFiles, [groupId]: (s.groupFiles[groupId] ?? []).filter((f) => f.id !== fileId) } })),
}))

useAppStore.subscribe((state) => {
  try {
    const toPersist: State = { students: state.students, projects: state.projects, tasks: state.tasks, groups: state.groups, groupFiles: state.groupFiles }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist))
  } catch {}
})

