import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';

function Base() {
  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Base
