import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthenticationPage from './components/auth.tsx'
import { ProtectedRoute } from './components/protected-route.tsx'
import { MusicsList } from './components/musics-list.tsx'
import { AuthProvider } from './components/providers/auth-provider.tsx'

import './index.css'
import { Profile } from './components/profile.tsx'
import { MusicInfo } from './components/music-info.tsx'
import { NotFound } from './components/not-found.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { Favorites } from './components/favorites.tsx'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />
  },
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
            element: <MusicsList />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/music/:id',
            element: <MusicInfo />
          },
          {
            path: '/favorites',
            element: <Favorites />
          }
        ]
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
