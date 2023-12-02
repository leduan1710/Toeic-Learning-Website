import React from 'react'
import { Outlet } from 'react-router-dom'
import "./ProfessorHome.css"

function ProfessorHome() {

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Professor Homepage</h3>
        </div>
        <Outlet/>
    </main>
  )
}

export default ProfessorHome