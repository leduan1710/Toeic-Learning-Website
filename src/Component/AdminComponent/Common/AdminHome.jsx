import React from 'react'
import { Outlet } from 'react-router-dom'
import "../../ProfessorComponent/Common/ProfessorHome.css"

function AdminHome() {

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h2>TRANG QUẢN TRỊ VIÊN</h2>
        </div>
        <Outlet/>
    </main>
  )
}

export default AdminHome