import { children } from 'react'
import {Navigate} from 'react-router-dom'


function PrivateRouter({ children}) {
    const isLogin=localStorage.getItem('login')
    console.log(isLogin);
    
  return (
    

        isLogin === 'true' ? children : <Navigate to="/login"/>
    
  )
}

export default PrivateRouter