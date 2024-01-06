import React, { useState } from 'react'
import LogOut from '../LogOut'
import {app, database} from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

function AdminDashboard() {
  const [adminData, setAdminData] = useState({}) //defining state variable adminData for storing input data
  //handling input field and storing data to adminData object
  const handleInput=(event)=>{   
    const newItem = {[event.target.name] : event.target.value}
    setAdminData({...adminData, ...newItem})
  }
  const collectionRef= collection(database, 'Admin Data')
  const handleSubmit=()=>{
   addDoc(collectionRef, {
     SportName: adminData.sport,
     Area : adminData.area,
     City: adminData.city,
     SportCategory : adminData.sportCategory
   })
   .then(()=>{
    alert("Sport Data added successfully")
   })
   .catch((err)=>{
    alert(err.message)
   })
  }
  return (
    <div>
      <h3>Admin DashBoard</h3>
      <label htmlFor='addSport'>Sport:</label>
      <input name='sport' type="text" id='addSport' onChange={handleInput}/>
      <label htmlFor="area">Area:</label>
      <input name='area' type="text" id='area' onChange={handleInput}/>
      <label htmlFor="city">City: </label>
      <input name='city' type="text" id='city' onChange={handleInput}/>
      <label htmlFor="sportCategory">Sport Category: </label>
      <input name='sportCategory' type="text" id='sportCategory'onChange={handleInput}/>
      <button onClick={handleSubmit}>Submit</button>
  
      <LogOut/>
    </div>
  )
}

export default AdminDashboard
