import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoanAdvanveCard from '../../components/cards/LoanAdvanveCard'
import { config } from "../../components/config/env"

export default function LoansEnpenses(props) {
    const ID = props.ID

    //loan & Advance
    const [expence, setExpence] = useState([]);
    const Expensedata = useCallback(async () => {
        const { apiUrl } = config()
        try {
            const response = await axios.get(`${apiUrl}getLoanAndAdvancesById/${ID}`)
            let data = response.data
            setExpence(data)
            // console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, [ID]);

    useEffect(() => {
        Expensedata();
    }, [Expensedata]);
    return (
        <section >
            <div className='bg-gray-100 min-h-screen'>
                <div className='container mx-auto p-5'>
                    <h1 className='text-4xl font-medium pb-7'>Loans & Expenses</h1>
                    <div className='flex justify-end'>
                        <Link to="/Apply"> <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-md px-5 py-2">Apply For Loan</button></Link>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid gap-4 mt-5'>
                        {expence.map((data) => {
                            if (data.type === "Loan") {
                                return (
                                    <LoanAdvanveCard
                                        key={data.id}
                                        name={data.name}
                                        date={data.date}
                                        type={data.type}
                                        typeName={data.deduction_type}
                                        amount={data.amount}
                                        EmployeeName={data['Employee Name']}
                                    />
                                );
                            }
                            else {
                                return (
                                    <LoanAdvanveCard
                                        key={data.id}
                                        name={data.name}
                                        date={data.date}
                                        type={data.type}
                                        typeName={data.advance_type}
                                        amount={data.amount}
                                        EmployeeName={data['Employee Name']}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
