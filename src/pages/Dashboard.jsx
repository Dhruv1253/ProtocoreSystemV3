import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, onSnapshot, query, where, serverTimestamp, orderBy } from 'firebase/firestore'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', amount: '' })

  useEffect(() => {
    const q = query(
      collection(db, 'expenses'),
      where('uid', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  const add = async (e) => {
    e.preventDefault()
    if (!form.title || !form.amount) return
    await addDoc(collection(db, 'expenses'), {
      uid: auth.currentUser.uid,
      title: form.title,
      amount: Number(form.amount),
      createdAt: serverTimestamp()
    })
    setForm({ title: '', amount: '' })
  }

  const total = items.reduce((s, i) => s + (i.amount || 0), 0)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
        <form className="space-y-3" onSubmit={add}>
          <input className="w-full rounded-xl border p-3 bg-transparent" placeholder="Title"
                 value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input className="w-full rounded-xl border p-3 bg-transparent" placeholder="Amount"
                 type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          <button className="btn btn-primary">Save</button>
        </form>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recent Expenses</h2>
          <div className="text-sm opacity-80">Total: ₹{total.toLocaleString()}</div>
        </div>
        <ul className="divide-y divide-black/5 dark:divide-white/10">
          {items.map(i => (
            <li key={i.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{i.title}</div>
                <div className="text-xs opacity-70">{i.createdAt?.toDate?.().toLocaleString?.() || '—'}</div>
              </div>
              <div className="font-semibold">₹{(i.amount || 0).toLocaleString()}</div>
            </li>
          ))}
          {items.length === 0 && <li className="py-6 text-center opacity-70">No expenses yet</li>}
        </ul>
      </div>
    </div>
  )
}
