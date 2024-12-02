import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

type tUser = {
    id:string,
    name: string,
    qty: number,
    price: number,
    description: string
}

const View = () => {
    const [values, setValues] = useState<tUser>({
        id:"",
        name: "",
        qty: 0,
        price: 0,
        description: ""
    });

    const {id} = useParams();
    const token = Cookies.get('auth_token')
    useEffect(() => {
            axios.defaults.withCredentials = true
            axios.get('http://127.0.0.1:8000/api/products/'+id,{headers:{Authorization: `Bearer ${token}`}})
                .then((res) => {
                    setValues(res.data.product)
                })
                .catch((error) => console.log(error))
    }, [])

  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='col-10 my-5'>
                       <div className='text-center'> 
                             <h3>Products Information</h3>
                        </div>
                        <div className='text-end my-2'> 
                             <Link to='/create' className='btn btn-sm btn-success me-1 shadow'>Add Product</Link>
                        </div>
                        <div className='border bg-white p-3'>
                            <table className='table table-striped table-bordered table-hover table-sm'>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{values.id}</td>
                                                <td>{values.name}</td>
                                                <td>{values.qty}</td>
                                                <td>{values.price}</td>
                                                <td>{values.description}</td>
                                                <td className='text-center'>
                                                    <Link to={`/update/${values.id}`} className='btn btn-sm btn-primary me-1'>Update</Link>
                                                    <Link to='/' className='btn btn-sm btn-danger'>Back</Link>
                                                </td>
                                            </tr>
                                        </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
      
    </div>
  )
}

export default View
