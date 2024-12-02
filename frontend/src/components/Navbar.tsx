import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

type tAuth = {
    id:string,
    email:string,
    username:string,
    
}

const Navbar = () => {
    const [auth, setAuth] = useState<tAuth>({
        id:"",
        email:"",
        username:"",
    })

    const token = Cookies.get('auth_token')
    useEffect(() => {
            axios.defaults.withCredentials = true
            axios.get('http://127.0.0.1:8000/api/products',{headers:{Authorization: `Bearer ${token}`}})
                .then((res) => {
                    setAuth(res.data.user)
                })
                .catch((error) => console.log(error))
    }, [])

    const navigate = useNavigate();

    const handleClick = () => {
        axios.defaults.withCredentials = true
        axios.post('http://localhost:8000/api/user/logout',{},{headers:{Authorization: `Bearer ${token}`}})
        .then((res) => {
            Cookies.remove('auth_token')
            alert('Successfully logout user.');
            navigate('/user/login');
        })
        .catch((error) => console.log(error.response.data.errors))
    }
  return (
    <div className='bg-dark text-light w-100 h-3'>
      <div className='container'>
        <div className='d-flex align-items-center justify-content-between'>
            <h4 className='mt-1'>Produkto</h4>
            
            {token ? 
                <div className='my-2 d-flex align-items-center justify-content-center'>
                <h5 className='me-3 mt-1'>{auth.email}</h5>
                <Link to='/' className='btn btn-sm btn-primary px-3 me-2'>Dashboard</Link>

                <button onClick={handleClick}  className='btn btn-sm btn-primary px-3 me-2'>Logout</button>
              
                </div>
                :
                <div className='my-2 d-flex align-items-center justify-content-center'>
                <Link to='/user/login' className='btn btn-sm btn-primary px-3 me-2'>Login</Link>
                <Link to='/user/register'  className='btn btn-sm btn-primary px-3 '>Register</Link>
                </div>
            }   
            
        </div>
      </div>
    </div>
  )
}

export default Navbar
