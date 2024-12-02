import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

type tUser2 = {
    id:string,
    name: string,
    qty: number | string,
    price: number | string,
    description: string
}
type tError = {
    name: string ,
    price:string, 
    qty: string ,
    description:string ,
}

const Update = () => {
    const [values, setValues] = useState<tUser2>({
        id:"",
        name: "",
        qty: 0,
        price: 0,
        description: ""
    });

    // const [error1, setError1] = useState<tError>({
    //     name: "",
    //     price:"",
    //     qty: "",
    //     description:"",
    // } )
    axios.defaults.withCredentials = true
    const {id} = useParams();
    const token = Cookies.get('auth_token')

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/'+id,{headers:{Authorization: `Bearer ${token}`}})
            .then((res) => {
                setValues(res.data.product)
            })
            .catch((error) => console.log(error.response.data.errors))
    },[])

    const navigate = useNavigate();
const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/api/products/update/${id}`,values,{headers:{Authorization: `Bearer ${token}`}})
            .then((res) => {
                alert('Successfully updated a Product.');
                navigate('/');
            })
            .catch((error) => console.log(error.response.data.errors))
}

  return (
    <div className='bg-light text-dark w-100 vh-100'>
        <div className='container'>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='col-8 my-5'>
                       <div className='text-center'> 
                             <h3>Update Product</h3>
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
                                <div className='border bg-white p-1'>
                                    <div className='row mb-2'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="name" className='fw-bold'>Name:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.name}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, name:event.target.value})}}/>

                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="qty" className='fw-bold'>Quantity:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.qty}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, qty:event.target.value})}}/>
                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="price" className='fw-bold'>Price:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.price}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, price:event.target.value})}}/>
                                        </div>
                                    </div>
                                    <div className='row mb-2'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                                <label htmlFor="description" className='fw-bold'>Description:</label>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type='text' className='form-control shadow' value={values.description}  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setValues({...values, description:event.target.value})}}/>
                                        </div>
                                    </div>                                   
                                     <div className='row mb-2'>
                                        <div className='col-3  d-flex align-items-center justify-content-center'>
                                        </div>
                                        <div className='col-9  d-flex align-items-center justify-content-center'>
                                            <input type="submit" value="Submit" className='btn btn-success shadow btn-sm px-4 me-2' />
                                            <Link to='/' className='btn btn-danger btn-sm px-4 shadow'>Back</Link>
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

export default Update
