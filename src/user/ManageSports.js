import LogOut from '../LogOut'
import { app, database } from '../firebase'
import React, { useEffect, useState } from 'react'
import {collection,
        addDoc,
        updateDoc,
        doc,
        onSnapshot,
        deleteDoc,
        query, where
       } from  "firebase/firestore"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
function ManageSports () {
  const [data, setData] = useState({})  //defining state variable data to store input data
  const [array, setArray] = useState([]) //defining state variable array to store data received from firebase
  const [user, setUser] =useState(null);
 
  const auth= getAuth(); //firebase
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
    if(user){
        setUser(user)
        getDetails(user)
    }else {
        setUser(null)
    }
    })
   },[auth])

  //handling sport Name input data and storing it to data object
  const handleInput=(event)=>{
  const newItem ={[event.target.name] :(event.target.value)}
  setData({...data, ...newItem})
  }

  //adding input data to firbase
  const collectionRef = collection(database, "userSports")
  const handleAddSport=(userdata)=>{
    addDoc(collectionRef, {
      sportEvent: data.sportEvent,
      userId :userdata.uid
    })
    .then(()=>{
      alert("Sport added successfully")
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  const handleAdd=()=>{
 handleAddSport(user)
  }

  //getting Data from firebase
  const getDetails = async(userdata)=>{
    const collectionRef= collection(database, 'userSports')
    const ageQuery = query(collectionRef, where("userId", "==" , userdata.uid))

                //for real time update
                 onSnapshot(ageQuery, (response)=>{  //for selected response
                        setArray(
                                    response.docs.map((item)=>{
                                        return {...item.data(), id: item.id};
                                    }))
                    })
}
useEffect(()=>{
  getDetails()
},[])

// Updating Sport Name using fireabse
const updateData=(id)=>{
const docToUpdate = doc(database, 'userSports', id)
updateDoc(docToUpdate, {
  sportEvent: data.sportEvent
})
.then(()=>{
  alert("Sport Updated Successfully")
})
.catch((err)=>{
  alert(err.message)
})
}

//deleting sport event from firebase by clicking
const deleteData=(id)=>{
  const docToDelete = doc(database, 'userSports', id)
  deleteDoc(docToDelete)
  .then(()=>{
    alert("Sport Deleted Successfully")
  })
  .catch((err)=>{
    alert(err.message)
  })
}
  return (
    <div>
      <h4 className="managesport">Manage Sports</h4>
      {/* users will input their data here  */}
      <input type="text" name="sportEvent" id="sportEvent" placeholder='Sports Name' onChange={handleInput}/>
      <button onClick={handleAdd}>Add Sport</button>
      {
        array ? array.map((content)=>{
          return(
            <div className='user-sportEvent'>
            <p>{content.sportEvent}</p>
            {/* users will input their data here  */}
      <input type="text" name="sportEvent" id="sportEvent" placeholder='Edit Name' onChange={handleInput}/>
            <button onClick={()=>updateData(content.id)} >Update Sport</button>
            <button onClick={()=>deleteData(content.id)}>Delete Sport</button>
            <hr />
            </div>
          )
        }) 
        : (
          <p>No data Avialable, add your document!</p>
        )
      }
      {/* Log Out component */}
      <LogOut/>  
    </div>
  )
}
export default ManageSports