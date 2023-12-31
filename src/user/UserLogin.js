import React, { useState,useEffect } from "react";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import ManageSports from "./ManageSports";
import LogOut from "../LogOut";
export default function UserLogin() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [user, setUser] = useState(null)
    const handleInput=(event)=>{
        let newItem= {[event.target.name]: event.target.value}
        setData({...data, ...newItem})
    }
    const handleLogin=()=>{
         signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response)=>{
            alert("Logged In Successfully")
            setUser(response.user)
            navigate('/user/managesports')
        })
        .catch((err)=>{
            alert(err.message)
            setUser(null)
        })
    }
    
  useEffect(()=>{
//    const userAuth= onAuthStateChanged(auth, (user)=>{
   onAuthStateChanged(auth, (user)=>{
    if(user){
        // alert("You are Logged In")
        setUser(user)
        navigate('/user/managesports')
    }else {
        // alert("You are Logged Out")
        setUser(null)
    }
    })
   
//    return ()=>userAuth(); 
    }
   ,[])
    return (
        <div>
            {user ? (
            <>
            <ManageSports/>
            </>) 
            : ( 
                <div>
            <h3>User's Login</h3>
            <input type="email" name="email" placeholder="email"  onChange={(event)=>handleInput(event)} />
            <input type="password" name="password" placeholder="password"  onChange={(event)=>handleInput(event)} />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have account?</p>
            <span><Link to='/user/registration'>Register</Link></span>
            {/* <p id="userEmailVerification"></p> */}
            </div>)
        }
        </div>
    )
}