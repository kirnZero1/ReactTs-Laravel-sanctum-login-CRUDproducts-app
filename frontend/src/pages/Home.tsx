import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';


type tUser = {
    id:string,
    name: string,
    qty: number,
    price: number,
    description: string
}

type tAuth = {
    id:string,
    email:string,
    username:string,
    
}


const Home = () => {

    const [values, setValues] = useState<tUser[]>([]);
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
                    setValues(res.data.products)
                    setAuth(res.data.user)
                })
                .catch((error) => console.log(error))
    }, []) 



    const handleDelete = (id: string) => {
        const confirms = window.confirm('Would you like to delete this Product?')
        if(confirms){
            axios.delete(`http://localhost:8000/api/products/delete/${id}`,{headers:{Authorization: `Bearer ${token}`}})
            .then((res) => {
                alert('Successfully delete the Product.');
                window.location.reload();
            })
            .catch((error) => console.log(error))
        }else{
            alert('Cancels delete Product')
        }
    }
  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='col-12 my-5'>
                       <div className='text-center'> 
                             <h3>Products Information</h3>
                        </div>
                        <div className='text-start ms-4'>                             
                             <h1>Welcome "{auth.username}"</h1></div>
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
                                            {values ? values.map((data, index) => {
                                                    return <tr key={index}>
                                                            <td>{data.id}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.qty}</td>
                                                            <td>{data.price}</td>
                                                            <td>{data.description}</td>
                                                            <td className='text-center'>
                                                                <Link to={`/view/${data.id}`} className='btn btn-sm btn-success me-1'>View</Link>
                                                                <Link to={`/update/${data.id}`} className='btn btn-sm btn-primary me-1'>Update</Link>
                                                                <button className='btn btn-sm btn-danger' onClick={()=>handleDelete(data.id)}>Delete</button>
                                                            </td>
                                                        </tr>
                                            }): <div><p>Loading</p></div>}
  
                                        </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
      
    </div>
  )
}

export default Home
