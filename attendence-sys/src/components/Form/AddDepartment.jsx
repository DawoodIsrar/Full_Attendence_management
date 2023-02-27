import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { config } from "../../components/config/env"

function AddDepartment(props) {
    const { index } = useParams();
    const [department, setDepartment] = useState({
        id: index,
        name: '',
        description: '',
    });

    const handleInputChange = (event) => {
        setDepartment({
            ...department,
            [event.target.name]: event.target.value,
        });
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { apiUrl } = config()
        if (props.name === 'Add') {
            axios
                .post(`${apiUrl}addDepartment`, department)
                .then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Department Added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.assign(`/Department `)
                    }, 1600)
                    setDepartment({
                        name: '',
                        desc: '',
                    })
                },
                )
                .catch((err) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Department Already Exist',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
        else {
            axios
                .patch(`${apiUrl}/updateDepart`, department)
                .then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Department Updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.assign(`/Department `)
                    }, 1600)
                    setDepartment({
                        name: '',
                        desc: '',
                    })
                },
                )
                .catch((err) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Department Already Exist',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
    };
    return (
        <section>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-5">
                    <h1 className='text-4xl font-medium pb-7'>{props.name} Department</h1>
                    <div className='flex justify-center'>
                        <div className='bg-white p-10 shadow-lg rounded-lg w-3/6'>
                            <form onSubmit={handleFormSubmit}>
                                <div className="grid md:grid-cols-1 gap-2">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={department.name} onChange={handleInputChange} required />
                                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department Name</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={department.description} onChange={handleInputChange} required />
                                        <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department Description</label>
                                    </div>
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4">{props.name} Department</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddDepartment