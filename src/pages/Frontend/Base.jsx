import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';

function Base() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Base
