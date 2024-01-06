import React, { useEffect, useState } from 'react'
import LogOut from '../LogOut'
import {app, database} from '../firebase'
import { addDoc,
        collection,
        deleteDoc,
        doc,
        onSnapshot, 
        updateDoc} from 'firebase/firestore'

function AdminDashboard() {
  const [adminData, setAdminData] = useState({}) //defining state variable adminData for storing input data
  const [firebaseData, setFirebaseData] = useState([]) //definig state variable firebaseData to store data received from fireabse
  
  //handling input field and storing data to adminData object
  const handleInput=(event)=>{   
    const newItem = {[event.target.name] : event.target.value}
    setAdminData({...adminData, ...newItem})
  }

  //submit data to firebase cloud firestore
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

  //getting data from firebase in real time update and storing it to firebaseData array
  const getDetails=()=>{
    onSnapshot(collectionRef, (response)=>{
      setFirebaseData(response.docs.map((item)=>{
        return {...item.data(), id: item.id}
      }))
    })
}
useEffect(()=>{
  getDetails()
},[])
 
//deleting admin sport data from firebase
const handleDelete=(id)=>{
  const docTodelete=doc(database, 'Admin Data', id )
  deleteDoc(docTodelete)
  .then(()=>{
    alert("Sport Data Deleted Successfully")
  })
  .catch((err)=>{
    alert(err.message)
  })
}

//updating data upon user click and input
const handleUpdate=(id)=>{
  const docToUpdate = doc(database, 'Admin Data', id)
  updateDoc(docToUpdate, {
    SportName: adminData.sport,
     Area : adminData.area,
     City: adminData.city,
     SportCategory : adminData.sportCategory
  })
  .then(()=>{
    alert('Sport Data Updated Successfully')
  })
  .catch((err)=>{
    alert(err.message)
  })
}
  return (
    <div>
      <h3>Admin Dashboard</h3>
      <div className="adminInput">
      <label htmlFor='addSport'>Sport:</label>
      <input name='sport' type="text" id='addSport' onChange={handleInput}/>
      <label htmlFor="area">Area:</label>
      <input name='area' type="text" id='area' onChange={handleInput}/>
      <label htmlFor="city">City: </label>
      <input name='city' type="text" id='city' onChange={handleInput}/>
      <label htmlFor="sportCategory">Sport Category: </label>
      <input name='sportCategory' type="text" id='sportCategory'onChange={handleInput}/>
      <button onClick={handleSubmit}>Add Sport Data</button>
      </div>
      {firebaseData?<p className='note'>*To update, First fill your data in your input field then click update button that you want to update!</p>
      : <p>No Data Found</p>}
      {
        firebaseData? (firebaseData.map((content)=>{
          return (
            <div>
              <div className='admin-data'>
              <p>{content.SportName}   </p>
              <p>{content.Area}    </p>
              <p>{content.City}    </p>
              <p>{content.SportCategory}</p>
              <button onClick={()=>handleUpdate(content.id)}>Update*</button>
              <button onClick={()=>handleDelete(content.id)}>Delete</button>
              </div>
            </div>
          )
        }))
        : <p>No Data Found</p>
      }
  
      <LogOut/>
    </div>
  )
}

export default AdminDashboard
