import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProjectPage from './pages/ProjectPage'
import ProfilePage from './pages/ProfilePage'
import GroupPage from './pages/GroupPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'project/:projectId', element: <ProjectPage /> },
      { path: 'profile/:studentId', element: <ProfilePage /> },
      { path: 'group/:groupId', element: <GroupPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
)
