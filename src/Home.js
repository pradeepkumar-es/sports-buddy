import React from 'react'
import AdminLogin from './admin/AdminLogin'
import UserLogin from './user/UserLogin'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      Home
      <div className="home">
        
        <UserLogin/>
       <Link to="/admin/login"> <p>Admin's Login Page</p></Link>
      </div>
    </div>
  )
}

export default Home
