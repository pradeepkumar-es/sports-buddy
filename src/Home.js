import React from 'react'
import UserLogin from './user/UserLogin'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      Home
      <div className="home">
       <UserLogin/>
        <p><Link to="/admin/login"> Admin's Login Page</Link></p>
      </div>
    </div>
  )
}

export default Home
