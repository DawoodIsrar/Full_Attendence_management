import axios from 'axios';
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';
import { config } from "../../components/config/env"
import Swal from 'sweetalert2';

export default function AddEmployee(props) {

    const [Department, setDepartment] = useState([])
    const Departmentp = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getAllDepart")
            setDepartment(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        Departmentp()
    }, [])


    const { ID } = useParams();
    const { name } = useParams();
    const status = [
        { id: 1, status: 'Active' },
        { id: 2, status: 'In-Active' },
    ]
    const gender = [
        { id: 1, gender: 'Male' },
        { id: 2, gender: 'Female' },
    ]
    const verification = [
        { id: 1, verification: 'Fingerprint' },
        { id: 2, verification: 'Password' },
    ]
    const role = [
        { id: 1, role: 'Admin' },
        { id: 2, role: 'User' },
    ]
    const [selected, setSelected] = useState(status[0])
    const [selectedgender, setSelectedgender] = useState(gender[0])
    const [selectedverification, setSelectedverification] = useState(verification[0])
    const [Role, setRole] = useState(role[0])
    const [employeeData, setEmployeeData] = useState({
        USERID: ID,
        name: name,
        gender: selectedgender.gender,
        contact: '',
        address: '',
        email: '',
        position: '',
        birthday: '',
        verification: selectedverification.verification,
        status: selected.status,
        join_date: '',
        desc: '',
        password: '',
        retypepassword: '',
        depName: '',
        roles: Role.role
    });
    const handleInputChange = (event) => {
        setEmployeeData({
            ...employeeData,
            [event.target.name]: event.target.value,
        });
    };
    const handleStatusChange = (selectedStatus) => {
        setSelected(selectedStatus);
        setEmployeeData({
            ...employeeData,
            status: selectedStatus.status,
        });
    };
    const handleGenderChange = (selectedGender) => {
        setSelectedgender(selectedGender);
        setEmployeeData({
            ...employeeData,
            gender: selectedGender.gender,
        });
    };
    const handleVarificationChange = (selectedVerification) => {
        setSelectedverification(selectedVerification);
        setEmployeeData({
            ...employeeData,
            verification: selectedVerification.verification,
        });
    };
    const handleRole = (selectedVerification) => {
        setRole(selectedVerification);
        setEmployeeData({
            ...employeeData,
            roles: selectedVerification.role,
        });
    };

    const handleFormSubmit = (event) => {
        const { apiUrl } = config()
        event.preventDefault();
        if (props.name === "Add Details") {
            const password = event.target.password.value;
            const retypePassword = event.target.retypepassword.value;
            if (password === retypePassword) {
                axios.post(`${apiUrl}signUpForEmployee`, employeeData)
                    .then(() => {
                        setEmployeeData({
                            USERID: ID,
                            name: '',
                            gender: '',
                            contact: '',
                            address: '',
                            email: '',
                            position: '',
                            birthday: '',
                            verification: '',
                            status: '',
                            join_date: '',
                            desc: '',
                            password: '',
                            retypepassword: '',
                            depName: '',
                            roles: '',
                        });
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Employee Added',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            window.location.assign(`/Employee/Profile/${name}/${ID} `)
                        }, 1600);
                    })
                    .catch((err) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Email Already Exist',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Password Not Matced',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        else if (props.name === "Update Details") {
            axios
                .post(`${apiUrl}updateEmployees`, employeeData)
                .then(() => {
                },
                    setEmployeeData({
                        USERID: ID,
                        name: name,
                        gender: '',
                        contact: '',
                        address: '',
                        email: '',
                        position: '',
                        birthday: '',
                        verification: '',
                        status: '',
                        join_date: '',
                        desc: '',
                        password: '',
                        retypepassword: '',
                        depName: '',
                        roles: ''
                    }),
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Employee Updated',
                        showConfirmButton: false,
                        timer: 1500
                    }),
                    setTimeout(() => {
                        window.location.assign(`/Employee/Profile/${name}/${ID} `)
                    }, 1600)
                )
                .catch((err) => console.error(err));
        }
    };
    return (
        <section>
            <div className='bg-gray-100 min-h-screen'>
                <div className='container mx-auto p-5'>
                    <h1 className='text-4xl font-medium pb-7'>{props.name}</h1>
                    <div className='bg-white p-5 shadow-lg rounded-lg'>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid md:grid-cols-3 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="number" name="USERID" id="USERID" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.USERID} onChange={handleInputChange} disabled />
                                    <label htmlFor="USERID" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee ID</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.name} onChange={handleInputChange} disabled required />
                                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="position" id="position" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.position} onChange={handleInputChange} required />
                                    <label htmlFor="position" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Position</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.email} onChange={handleInputChange} required />
                                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input id="address" type="text" name="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.address} onChange={handleInputChange} required />
                                    <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <select id='depName' name="depName" value={employeeData.depName} onChange={handleInputChange} className="mt-5 block w-full text-center text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 peer" required >
                                        <option disabled defaultValue hidden value="">Select</option>
                                        {Department.map((data) => {
                                            return (
                                                <option value={data["Department Name"]}>{data["Department Name"]}</option>
                                            )
                                        })}

                                    </select>
                                    <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Department</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="password" name="password" id="password" minlength="8" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.password} onChange={handleInputChange} required />
                                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input id="retypepassword" type="password" minlength="8" name="retypepassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.retypepassword} onChange={handleInputChange} required />
                                    <label htmlFor="retypepassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Retype Password</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input id="contact" type="number" name="contact" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.contact} onChange={handleInputChange} required />
                                    <label htmlFor="contact" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Contact</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <textarea id="desc" rows="1" type="text" name="desc" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={employeeData.desc} onChange={handleInputChange} required />
                                    <label htmlFor="desc" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                                </div>

                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="date" name="join_date" id="join_date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={employeeData.join_date} onChange={handleInputChange} required />
                                    <label htmlFor="join_date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Member Since</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="date" name="birthday" id="birthday" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={employeeData.birthday} onChange={handleInputChange} required />
                                    <label htmlFor="birthday" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birthday</label>
                                </div>

                            </div>

                            <div className='grid gap-6 md:grid-cols-4 md:gap-5 mx-12 my-2'>

                                <div className="relative z-0 w-full mb-6 group flex justify-start">
                                    <div className="mb-6 flex items-center align-middle">
                                        <div className="w-full flex align-bottom flex-row sm:flex-col lg:flex-row items-center ">
                                            <label className=' sm:mb-3 lg:mb-0 mr-4 text-sm text-gray-500'>Status</label>
                                            <Listbox value={selected} onChange={handleStatusChange}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative sm:w-52 lg:w-36 xl:w-52 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                                        <span className="block truncate">{selected.status}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {status.map((person, personIdx) => (
                                                                <Listbox.Option
                                                                    key={personIdx}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                    }`}
                                                                            >
                                                                                {person.status}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-6 group flex justify-center">
                                    <div className="mb-6 flex items-center align-middle">
                                        <div className="w-full flex align-bottom flex-row sm:flex-col lg:flex-row items-center ">
                                            <label className=' sm:mb-3 lg:mb-0 mr-4 text-sm text-gray-500'>Role</label>
                                            <Listbox value={Role} onChange={handleRole}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative sm:w-52 lg:w-36 xl:w-52 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                                        <span className="block truncate">{Role.role}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {role.map((person, personIdx) => (
                                                                <Listbox.Option
                                                                    key={personIdx}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ Role }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${Role ? 'font-medium' : 'font-normal'
                                                                                    }`}
                                                                            >
                                                                                {person.role}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-6 group flex justify-center">
                                    <div className="mb-6 flex items-center align-middle">
                                        <div className="w-full flex align-bottom flex-row sm:flex-col lg:flex-row items-center ">
                                            <label className=' sm:mb-3 lg:mb-0 mr-4 text-sm text-gray-500'>Gender</label>
                                            <Listbox value={selectedgender} onChange={handleGenderChange}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative sm:w-52 lg:w-36 xl:w-52 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                                        <span className="block truncate">{selectedgender.gender}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {gender.map((person, personIdx) => (
                                                                <Listbox.Option
                                                                    key={personIdx}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selectedgender }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${selectedgender ? 'font-medium' : 'font-normal'
                                                                                    }`}
                                                                            >
                                                                                {person.gender}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative z-0 w-full mb-6 group flex justify-end">
                                    <div className="mb-6 flex items-center align-middle">
                                        <div className="w-full flex align-bottom flex-row sm:flex-col lg:flex-row items-center ">
                                            <label className=' sm:mb-3 lg:mb-0 mr-4 text-sm text-gray-500'>Verification Method</label>
                                            <Listbox value={selectedverification} onChange={handleVarificationChange}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative sm:w-52 lg:w-36 xl:w-52 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                                        <span className="block truncate">{selectedverification.verification}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {verification.map((person, personIdx) => (
                                                                <Listbox.Option
                                                                    key={personIdx}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selectedverification }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${selectedverification ? 'font-medium' : 'font-normal'
                                                                                    }`}
                                                                            >
                                                                                {person.verification}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
