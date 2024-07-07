import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthenticationPage from './components/auth.tsx'
import { ProtectedRoute } from './components/protected-route.tsx'
import { Dashbord } from './components/dashboard.tsx'
import { AuthProvider } from './components/auth-provider.tsx'

import './index.css'

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      ...(['/', '/login', '/register'].map((path) => ({
        path,
        element: <AuthenticationPage />,
      }))),
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/home',
            element: <Dashbord />,
          },
        ]
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
