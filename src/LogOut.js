import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

function LogOut() {
    const navigate= useNavigate();
    const auth = getAuth();
    const handleLogOut=()=>{
    signOut(auth);
    alert("Logged Out Successfully")
    navigate('/')
    }
  return (
    <div>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default LogOut
