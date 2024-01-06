import React, { useState,useEffect } from "react";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
export default function AdminLogin() {
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
            navigate('/admin/dashboard')
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
    }else {
        // alert("You are Logged Out")
        setUser(null)
    }
    })
   
//    return ()=>userAuth(); 
    }
   ,[])

   //login help for checking admin dashboard
   const loginHelp=()=>{
    alert(`
    Note: For Checking admin dashboard purpose
    email: admin@gmail.com
    password: 123456`)
   }
    return (
        <div>
            {user ? (
            <>
            <AdminDashboard/>
            </>) 
            : ( 
                <div>
            <h3>Admin Login</h3>
            <input type="email" name="email" placeholder="email"  onChange={(event)=>handleInput(event)} />
            <input type="password" name="password" placeholder="password"  onChange={(event)=>handleInput(event)} />
            <button onClick={handleLogin}>Login</button>
            <p className="admin-login-help" onClick={loginHelp}>Login Help</p>

            {/* Admin Registratioon, uncomment for registering it as admin */}
            {/* <p>Don't have account?</p>
            <span><Link to='/user/registration'>Register</Link></span> */}

            </div>)
        }
        </div>
    )
}