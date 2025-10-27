import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

export default function Login() {
  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e) {
      alert(e.message)
      console.error(e)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-24 card text-center">
      <h1 className="text-2xl font-semibold mb-2">Welcome</h1>
      <p className="opacity-80 mb-6">Sign in with Google to continue</p>
      <button className="btn btn-primary w-full" onClick={login}>
        Continue with Google
      </button>
    </div>
  )
}
