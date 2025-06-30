import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
        <nav style={{ padding: '1rem', backgroundColor: '#eee'}}>
            <Link to='/tasks'>Tasks</Link>
            <button>Login/Logout</button>
        </nav>
        <main>
            <Outlet />
        </main>
    </div>
  )
}
