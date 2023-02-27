import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { config } from "../../components/config/env"

export default function AddTask(props) {
    const { index } = useParams();
    const { Name } = useParams();
    const { ID } = useParams();

    const status = [
        { id: 0, status: 'Select' },
        { id: 1, status: 'In Process' },
        { id: 2, status: 'Completed' },
    ]
    const [selected, setSelected] = useState(status[0])
    const [department, setDepartment] = useState({
        id: index,
        EmpName: Name,
        name: '',
        description: '',
        status: "",
        assignDate: '',
        deadline: "",
        USERID: ID
    });
    const handleInputChange = (event) => {
        setDepartment({
            ...department,
            [event.target.name]: event.target.value,
        });
    };
    const handleFormSubmit = (event) => {
        const { apiUrl } = config()
        event.preventDefault();
        if (props.name === 'Add Project') {
            axios
                .post(`${apiUrl}addProjects`, department)
                .then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Project Added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.assign(`/Projects `)
                    }, 1600)
                    setDepartment({
                        EmpName: '',
                        name: '',
                        description: '',
                        status: "",
                        assignDate: '',
                        deadline: "",
                        USERID: ""
                    })
                },
                )
                .catch((err) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
        else if (props.name === 'Add Task') {
            axios
                .post(`${apiUrl}addTask`, department)
                .then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Task Added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.assign(`/Tasks`)
                    }, 1600)
                    setDepartment({
                        EmpName: '',
                        name: '',
                        description: '',
                        status: "",
                        assignDate: '',
                        deadline: "",
                        USERID: ""
                    })
                },
                )
                .catch((err) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
        else if (props.name === 'Update Project') {
            axios
                .patch(`${apiUrl}updateProject`, department)
                .then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Project Updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.assign(`/Projects`)
                    }, 1600)
                    setDepartment({
                        EmpName: '',
                        name: '',
                        description: '',
                        status: "",
                        assignDate: '',
                        deadline: "",
                        USERID: ""
                    })
                },
                )
                .catch((err) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
        else if (props.name === 'Update Task') {
            axios
                .patch(`${apiUrl}updateTask`, department)
                .then((res) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Task Updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.assign(`/Tasks `)
                    }, 1600)
                    setDepartment({
                        EmpName: '',
                        name: '',
                        description: '',
                        status: "",
                        assignDate: '',
                        deadline: "",
                        USERID: ""
                    })
                },
                )
                .catch((err) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
    };
    const handleStatusChange = (selectedStatus) => {
        setSelected(selectedStatus);
        setDepartment({
            ...department,
            status: selectedStatus.status,
        });
    };
    return (
        <section>
            <div className='bg-gray-100 min-h-screen'>
                <div className='container mx-auto p-5'>
                    <h1 className='text-4xl font-medium pb-7'>{props.name}</h1>
                    <div className='bg-white p-5 shadow-lg rounded-lg'>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid md:grid-cols-2 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="number" name="USERID" id="USERID" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={department.USERID} onChange={handleInputChange} required />
                                    <label htmlFor="USERID" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee ID</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="EmpName" id="EmpName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={department.EmpName} onChange={handleInputChange} required />
                                    <label htmlFor="EmpName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee Name</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={department.name} onChange={handleInputChange} required />
                                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.field} Name</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <textarea id="description" rows="1" type="text" name="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={department.description} onChange={handleInputChange} required />
                                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.field} Description</label>
                                </div>

                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6 my-2">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="date" name="assignDate" id="assignDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={department.assignDate} onChange={handleInputChange} required />
                                    <label htmlFor="assignDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Assign Date</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="date" name="deadline" id="deadline" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={department.deadline} onChange={handleInputChange} required />
                                    <label htmlFor="deadline" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deadline</label>
                                </div>
                            </div>
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
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{props.name}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
