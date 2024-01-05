import LogOut from '../LogOut'
import { app, database } from '../firebase'
import React, { useState } from 'react'
import {collection, addDoc} from  "firebase/firestore"
function ManageSports () {
  const [data, setData] = useState({})
  const handleInput=(event)=>{
  const newItem ={[event.target.name] :(event.target.value)}
  setData({...data, ...newItem})
  }
  console.log(data.sportEvent)
  const collectionRef = collection(database, "userSports")
  const handleAdd=()=>{
    addDoc(collectionRef, {
      sportEvent: data.sportEvent
    })
    .then(()=>{
      alert("Sport added successfully")
    })
    .catch((err)=>{
      alert(err.message)
    })
  }
  
  return (
    <div>
      <h4 className="managesport">Manage Sports</h4>
      <input type="text" name="sportEvent" id="sportEvent" placeholder='Sports Name' onChange={handleInput}/>
      <button onClick={handleAdd}>Add Sport</button>
      {/* Log Out component */}
      <LogOut/>  
    </div>
  )
}
export default ManageSports