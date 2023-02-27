import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { config } from "../../components/config/env"

function Salary(props) {
  const inputType = props.input
  const { name } = useParams();
  const { date } = useParams();
  const [Bonus, setBonus] = useState({
    name: name,
    month: date,
    [inputType]: '',
    reason: ''
  });
  const handleInputChange = (event) => {
    setBonus({
      ...Bonus,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (event) => {
    const { apiUrl } = config()
    event.preventDefault();
    if (props.name === 'Additions') {
      axios
        .patch(`${apiUrl}updateAddition`, Bonus)
        .then((res) => {
          console.log(res)
        },
          setBonus({
            name: name,
            month: date,
            inputType: '',
          }),
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bonus Added',
            showConfirmButton: false,
            timer: 1500
          }),
          setTimeout(() => {
            window.location.assign('/Payroll_Item')
          }, 1600)
        )
        .catch((err) => console.error(err));
    }
    else if (props.name === 'Overtime') {
      axios
        .patch(`${apiUrl}updateOvertimerate`, Bonus)
        .then((res) => {
          console.log(res)
        },
          setBonus({
            name: name,
            month: date,
            inputType: '',
          }),
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Overtime Added',
            showConfirmButton: false,
            timer: 1500
          }),
          setTimeout(() => {
            window.location.assign('/Payroll_Item')
          }, 1600)
        )
        .catch((err) => console.error(err));
    }
    else {
      axios
        .patch(`${apiUrl}updatededuction`, Bonus)
        .then((res) => {
          console.log(res)
        },
          setBonus({
            name: name,
            month: date,
            inputType: '',
            reason: ''
          }),
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Deduction Added',
            showConfirmButton: false,
            timer: 1500
          }),
          setTimeout(() => {
            window.location.assign('/Payroll_Item')
          }, 1600)
        )
        .catch((err) => console.error(err));
    }
  };
  console.log(Bonus)

  return (
    <section>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-5">
          <h1 className='text-4xl font-medium pb-7'>Update {props.name}</h1>
          <div className='bg-white p-5 shadow-lg rounded-lg'>
            <form onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled value={Bonus.name} onChange={handleInputChange} required />
                  <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="month" id="month" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled value={Bonus.month} onChange={handleInputChange} required />
                  <label htmlFor="month" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="number" name={inputType} id={inputType} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Bonus.inputType} onChange={handleInputChange} required />
                  <label htmlFor={inputType} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.type}</label>
                </div>
                {props.type === 'Deduction' ? (
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="reason"
                      id="reason"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={Bonus.reason}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="reason" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reason</label>
                  </div>
                ) : null}

              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-4">Update {props.name}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Salary