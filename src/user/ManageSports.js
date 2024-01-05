import LogOut from '../LogOut'
import { app } from '../firebase'
// import { Link } from 'react-router-dom'
import React from 'react'
function ManageSports () {
  return (
    <div>
      Manage Sports
      <LogOut/>
      {/* <button><Link to='/logout'>Log Out</Link></button> */}
    </div>
  )
}
export default ManageSports