import React from 'react'
import { app } from '../firebase'
import { database } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useState } from 'react'

function ManageSports() {
  const [sport , setSport] = useState({})
  const collectionRef = collection(database, 'userSportsManage')
  const handleInput=()=>{
    
  }
  const handleAdd=async()=>{
  await addDoc(collectionRef, {
    sportsName: sport
  })
  }

  return (
    <div>
      Manage Sports <br />
      <input type="text" onClick={handleInput}/>
      <button onClick={()=>handleAdd}>Add Sports</button>
      <button>Delete Sports</button>
    </div>
  )
}

export default ManageSports
