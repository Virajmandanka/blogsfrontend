import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

   const [state,setState]=useState({
     
    email:"",
    password:""
   })

   const handalchenge=(e)=>{

    const {name,value}=e.target

    setState({...state,[name]:value})


   }

   const nav = useNavigate()

   const handalsbmit=(e)=>{
    e.preventDefault()

    fetch(`http://localhost:8080/user/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(state)

    })

    .then((res)=>res.json())
    .then((res)=>{
        

        localStorage.setItem("token",res.token)
        localStorage.setItem("login",true)
        nav("/addblog")
        console.log(res.token)
        if(res.err)
        {
            alert("email not register")
        }
        else if(res.error)
        {
            alert("password is incorrect")
        }
        else if(res.messege)
            {
                alert("user login successefully")
            }
    })

   }



    
  return (
    <div className="login-container">

        <form className='form1' action="" onSubmit={handalsbmit} method='post'>

             <h2>Login </h2>
        <input className='in1' type="text" placeholder='Enter you email' name='email' value={state.email} onChange={handalchenge}  />
        <input className='in1' type="text" placeholder='Enter you password' name='password' value={state.password} onChange={handalchenge}  />
        <button className='btn1' type="submit">Signin</button>

        </form>
       



    </div>
  )
}

export default Login