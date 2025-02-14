import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

   const [state,setState]=useState({
     
    username:"",
    email:"",
    password:""
   })

   const handalchenge=(e)=>{

    const {name,value}=e.target

    setState({...state,[name]:value})


   }

   const handalsbmit=(e)=>{
    e.preventDefault()

    fetch(`http://localhost:8080/user/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(state)

    })

    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
    })

   }

   const navigate=useNavigate();

   const check=()=>{

    navigate("/login")

   }



    
  return (
    <div className="signup-container">

        <form className="signup-form" action="" onSubmit={handalsbmit} method='post'>
             <h2>Signup</h2>
        <input type="text" placeholder='Enter you username' name='username' value={state.username} onChange={handalchenge}  />
        <input type="text" placeholder='Enter you email' name='email' value={state.email} onChange={handalchenge}  />
        <input type="text" placeholder='Enter you password' name='password' value={state.password} onChange={handalchenge}  />
        <button type="submit">Signup</button>
        <button className="login-btn" type='submit' onClick={check}>login</button>

        </form>
       



    </div>
  )
}

export default Signup