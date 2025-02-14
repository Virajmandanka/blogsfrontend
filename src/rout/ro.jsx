import React from 'react'
import Signup from '../componet/signup'
import Login from '../componet/login'
import Addblog from '../componet/addblog'
import Bloglist from '../componet/bloglist'
import Getmain from '../componet/getmain'
import Singalblog from '../componet/singalblog'
import Upadate from '../componet/upadate'
import Logout from '../componet/logout'
import {Routes,Route} from "react-router-dom"
import PrivateRouter from '../componet/private'


function Ro() {
  return (
    <div>

        <Routes>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/addblog' element={
              <PrivateRouter>
              <Addblog/>
            </PrivateRouter>
              }></Route>
            <Route path='/' element={
             
              <Bloglist/>
            

              }></Route>
            <Route path='/getmain' element={
              
               <PrivateRouter>
              <Getmain/>
              </PrivateRouter>
              
              }></Route>
            <Route path='/singalblog' element={<Singalblog/>}></Route>
            <Route path='/singalblog/:id' element={<Singalblog/>} ></Route>
            <Route path='/upadate/:id' element={<Upadate/>}></Route>
            <Route path='/logout' element={<Logout/>}></Route>
        </Routes>

    


    </div>
  )
}

export default Ro