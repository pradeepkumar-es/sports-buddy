import React from 'react'
import { getAuth, signOut } from 'firebase/auth'

function LogOut() {
    const auth = getAuth();
    const handleLogOut=()=>{
    signOut(auth);
    }
  return (
    <div>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default LogOut
