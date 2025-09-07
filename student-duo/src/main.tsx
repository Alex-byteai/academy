import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/LoginPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import ProjectPage from './pages/ProjectPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import GroupPage from './pages/GroupPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

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
      <Toaster position="top-center" />
    </Suspense>
  </StrictMode>
)
