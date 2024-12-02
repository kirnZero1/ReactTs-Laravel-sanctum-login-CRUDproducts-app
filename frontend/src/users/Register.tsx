import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

type tUser23 = {
    username: string,
    email: string,
    password:  string,
    password_confirmation: string,

}
// type tError = {
//     name: string ,
//     price:string, 
//     qty: string ,
//     description:string ,
// }

const Register = () => {
    const [values, setValues] = useState<tUser23>({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // const [error1, setError1] = useState<tError>({
    //     name: "",
    //     price:"",
    //     qty: "",
    //     description:"",
    // } )
    axios.defaults.withCredentials = true
    const navigate = useNavigate();
const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/user/register/',values)
            .then((res) => {
                alert('Successfully register a  user.');
                navigate('/');
            })
            .catch((error) => console.log(error.response.data.errors))
}

  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='col-5 my-5'>
                       <div className='text-center'> 
                             <h3>Register User</h3>
                        </div>
                        {/* {error1  ? 
                                <div className='text-center text-danger'>
                                                <ul >
                                                    <li>{error1.name}</li>
                                                    <li>{error1.qty}</li>
                                                    <li>{error1.price}</li>
                                                    <li>{error1.description}</li>
                                                </ul>                
                                    </div> 
                        
                       : <div></div> } */}
                        <form onSubmit={handleSubmit}>
                                <div className='border bg-white p-3'>
                                    <div className='row mb-2 mt-4'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="username" className='fw-bold'>Username:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.username}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, username:event.target.value})}}/>

                                        </div>
                                    </div>
                                    <div className='row mb-2 mt-4'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="email" className='fw-bold'>Email:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.email}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, email:event.target.value})}}/>

                                        </div>
                                    </div>
                                    <div className='row mb-4 mt-4'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="password" className='fw-bold'>Password:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.password}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, password:event.target.value})}}/>
                                        </div>
                                    </div> 
                                    <div className='row mb-2 mt-4'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="password_confirmation" className='fw-bold'>Confirm Password:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.password_confirmation}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, password_confirmation:event.target.value})}}/>

                                        </div>
                                    </div>                                 
                                     <div className='row mb-2'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type="submit" value="Submit" className='btn btn-success shadow btn-sm px-4 me-2' />
                                            <Link to='/user/login' className='btn btn-danger btn-sm px-4 shadow'>Login</Link>
                                        </div>
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
        </div>
      
    </div>
  )
}

export default Register
