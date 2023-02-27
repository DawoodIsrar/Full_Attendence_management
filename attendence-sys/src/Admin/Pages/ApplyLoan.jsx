import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import Swal from 'sweetalert2'
import { config } from "../../components/config/env"

const year = [
    { id: 0, year: 'Select' },
    { id: 1, year: 'Loan' },
    { id: 2, year: 'Advance' },
]
const DType = [
    { id: 0, DType: 'Select' },
    { id: 1, DType: 'One Time' },
    { id: 2, DType: 'Monthly' },
]
const AType = [
    { id: 0, AType: 'Select' },
    { id: 1, AType: 'Half Pay' },
    { id: 2, AType: 'Full Pay' },
]
export default function ApplyLoan() {

    const [selectedDType, setSelectedDType] = useState(DType[0])
    const [selected, setSelected] = useState(year[0])
    const [selectedAType, setSelectedAType] = useState(AType[0])
    const [expense, setExpense] = useState({
        USERID: '',
        Ename: '',
        name: '',
        date: '',
        amount: '',
        type: '',
        advance_type: '',
        deduction_type: '',
    });
    const handleInputChange = (event) => {
        setExpense({
            ...expense,
            [event.target.name]: event.target.value,
        });
    };
    const handleTypeChange = (selectedType) => {
        setSelected(selectedType);
        setExpense({
            ...expense,
            type: selectedType.year,
        });
    };
    const handleLoanChange = (selectedType) => {
        setSelectedDType(selectedType);
        setExpense({
            ...expense,
            deduction_type: selectedType.DType,
        });
    };
    const handleAdvanceChange = (selectedType) => {
        setSelectedAType(selectedType);
        setExpense({
            ...expense,
            advance_type: selectedType.AType,
        });
    };
    const handleFormSubmit = (event) => {
        const { apiUrl } = config()
        event.preventDefault();
        axios
            .post(`${apiUrl}addLoanAndAdvances`, expense)
            .then((res) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Expense Added',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    window.location.assign(`/loans&expenses`)
                }, 1600)
                setExpense({
                    USERID: '',
                    Ename: '',
                    name: '',
                    date: '',
                    amount: '',
                    type: '',
                    advance_type: '',
                    deduction_type: '',
                })
            },
            )
            .catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'User ID not Found',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    };
    return (
        <section>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-5">
                    <h1 className='text-4xl font-medium pb-7'>Apply For Loan or Advance</h1>
                    <div className='flex justify-center mt-10'>
                        <div className='bg-white p-5 shadow-lg rounded-lg w-8/12'>
                            <form onSubmit={handleFormSubmit}>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="number" name="USERID" id="USERID" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={expense.USERID} onChange={handleInputChange} required />
                                        <label htmlFor="USERID" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee ID</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" name="Ename" id="Ename" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={expense.Ename} onChange={handleInputChange} required />
                                        <label htmlFor="Ename" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee Name</label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">

                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="date" name="date" id="date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={expense.date} onChange={handleInputChange} required />
                                        <label htmlFor="date" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={expense.name} onChange={handleInputChange} required />
                                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name of Expense</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="number" name="amount" id="amount" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={expense.amount} onChange={handleInputChange} required />
                                        <label htmlFor="amount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6 ">
                                    <div className="mb-6 flex items-center align-middle">
                                        <div className="w-full flex align-bottom flex-row sm:flex-col lg:flex-row items-center ">
                                            <label className=' sm:mb-3 lg:mb-0 mr-4 text-sm text-gray-500'>Type</label>
                                            <Listbox value={selected} onChange={handleTypeChange}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative sm:w-52 lg:w-36 xl:w-52 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                                        <span className="block truncate">{selected.year}</span>
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
                                                            {year.map((person, personIdx) => (
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
                                                                                {person.year}
                                                                            </span>
                                                                            {selected ? (
                                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                </span>
                                                                            ) : null}

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
                                    <div>
                                        {selected.id === 1 && (
                                            <div className="w-full flex align-bottom items-center sm:flex-col lg:flex-row">
                                                <label className='sm:mb-3 lg:mb-0 mr-4 text-sm text-gray-500'>Deduction Type:</label>
                                                <Listbox value={selectedDType} onChange={handleLoanChange}>
                                                    <div className="relative">
                                                        <Listbox.Button className="relative sm:w-52 lg:w-36 xl:w-52 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                                            <span className="block truncate">{selectedDType.DType}</span>
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
                                                                {DType.map((person, personIdx) => (
                                                                    <Listbox.Option
                                                                        key={personIdx}
                                                                        className={({ active }) =>
                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={person}
                                                                    >
                                                                        {({ selectedDType }) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${selectedDType ? 'font-medium' : 'font-normal'
                                                                                        }`}
                                                                                >
                                                                                    {person.DType}
                                                                                </span>
                                                                                {selectedDType ? (
                                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}

                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                            </div>
                                        )}

                                        {selected.id === 2 && (
                                            <div className="w-full flex align-bottom items-center sm:flex-col lg:flex-row">
                                                <label className='sm:mb-3 lg:mb-0 mr-4 text-sm text-gray-500'>Advance Type</label>
                                                <Listbox value={selectedAType} onChange={handleAdvanceChange}>
                                                    <div className="relative">
                                                        <Listbox.Button className="relative sm:w-52 lg:w-36 xl:w-52 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center border-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                                                            <span className="block truncate">{selectedAType.AType}</span>
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
                                                                {AType.map((person, personIdx) => (
                                                                    <Listbox.Option
                                                                        key={personIdx}
                                                                        className={({ active }) =>
                                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                                            }`
                                                                        }
                                                                        value={person}
                                                                    >
                                                                        {({ selectedAType }) => (
                                                                            <>
                                                                                <span
                                                                                    className={`block truncate ${selectedAType ? 'font-medium' : 'font-normal'
                                                                                        }`}
                                                                                >
                                                                                    {person.AType}
                                                                                </span>
                                                                                {selectedAType ? (
                                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                ) : null}

                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </Listbox>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
