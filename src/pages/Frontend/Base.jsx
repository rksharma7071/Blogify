import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import { AuthContext } from "../../context/AuthContext";
import Loading from '../../components/common/Loading';

function Base() {
  // const { capitalize } = useContext(AuthContext)
  const { loading } = useContext(AuthContext);
  console.log(loading)
  return (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      <Header />
      <Outlet />
      {/* <Loading /> */}
    </div>
  )
}

export default Base
