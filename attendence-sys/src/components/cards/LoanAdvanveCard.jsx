import React from 'react'

export default function LoanAdvanveCard(props) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-lg font-medium">Applied for {props.name}</h1>
            <hr className='mt-5' />
            <div className='py-5'>
                <div className='flex justify-between'>
                    <p className="text-gray-700 mt-2 font-medium">Employee Name:</p>
                    <p className="text-gray-700 mt-2">{props.EmployeeName}</p>
                </div>
                <div className='flex justify-between'>
                    <p className="text-gray-700 mt-2 font-medium">Date:</p>
                    <p className="text-gray-700 mt-2">{props.date}</p>
                </div>
                <div className='flex justify-between'>
                    <p className="text-gray-700 mt-2 font-medium">{props.type} Type:</p>
                    <p className="text-gray-700 mt-2">{props.typeName}</p>
                </div>
                <div className='flex justify-between'>
                    <p className="text-gray-700 mt-2 font-medium">Amount:</p>
                    <p className="text-gray-700 mt-2">{props.amount}</p>
                </div>

            </div>
        </div>
    )
}
