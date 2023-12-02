import React from 'react'
import { Outlet } from 'react-router-dom'

function ProfessorDashboard() {

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>PROFESSOR DASHBOARD</h3>
        </div>
        <Outlet/>
    </main>
  )
}

export default ProfessorDashboard