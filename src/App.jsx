import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

function Shell({ user }) {
  const navigate = useNavigate()
  const doLogout = async () => { await signOut(auth); navigate('/login') }
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 backdrop-blur border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="font-semibold text-lg">Protocore Expenses</Link>
          <div className="flex items-center gap-3">
            {user && <span className="text-sm opacity-80">{user.email}</span>}
            {user && <button className="btn btn-primary" onClick={doLogout}>Logout</button>}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="text-center text-xs opacity-60 p-6">© Protocore Systems</footer>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false) })
    return () => unsub()
  }, [])

  if (loading) return <div className="p-10 text-center">Loading…</div>
  return <Shell user={user} />
}
