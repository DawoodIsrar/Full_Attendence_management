import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { config } from "../src/components/config/env"
export default function Login() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    })
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        const { apiUrl } = config()
        e.preventDefault();
        //API call
        const response = await fetch(`${apiUrl}SecurelogIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.accessToken) {
            // Save the auth token and redirect
            sessionStorage.setItem('token', json.accessToken);
            sessionStorage.setItem('id', json.id);
            sessionStorage.setItem('role', json.roles);
            sessionStorage.setItem('userName', json.username);
            Toast.fire({
                icon: 'success',
                title: 'Signed in'
            })
            setTimeout(() => {
                window.location.assign('/');
            }, 1600);
        }
        else {
            Toast.fire({
                icon: 'error',
                title: 'Invalid Email or Password'
            })
        }
    }
    return (
        <section>
            <div className="bg-blue-100 h-screen w-full flex justify-center items-center">
                <div className="bg-blue-600 w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
                    <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
                        <h1 className="text-3xl">Hello</h1>
                        <p className="text-5xl font-extrabold">Welcome!</p>
                    </div>
                    <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8">
                        <h3 className="text-3xl font-bold text-blue-600 mb-4">
                            LOGIN
                        </h3>
                        <form className="w-full flex flex-col justify-center" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-1 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={credentials.email} onChange={onChange} required />
                                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-1 md:gap-6 my-2">

                                <div className="relative z-0 w-full mb-6 group">
                                    <input id="password" type="password" name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={credentials.password} onChange={onChange} required />
                                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-600 font-bold text-white focus:outline-none rounded p-3">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
