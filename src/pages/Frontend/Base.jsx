import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';

function Base() {
  return (
    <div className='bg-gray-100'>
      <Header />
      <Outlet />
    </div>
  )
}

export default Base
