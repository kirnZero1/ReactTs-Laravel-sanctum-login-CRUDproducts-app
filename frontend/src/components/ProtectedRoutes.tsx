import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoutes : React.FC = () => {
    const token = Cookies.get('auth_token')
  return token ? <Outlet/> : <Navigate to="/user/login" /> 
}

export default ProtectedRoutes