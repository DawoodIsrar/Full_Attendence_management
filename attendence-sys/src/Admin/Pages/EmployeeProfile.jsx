import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import user from '../../components/assets/user.png'
import Table from '../../components/Table/Table';
import { config } from "../../components/config/env"

export default function EmployeeProfile() {
    const Headers = ["Employee ID", "Employee Name", "Date"]
    const { ID } = useParams();
    const [EmployeeData, setEmployeeData] = useState([]);
    const employeeArray = Array.isArray(EmployeeData) ? EmployeeData : [EmployeeData];

    useEffect(() => {
        const ProfileData = async () => {
            const { apiUrl } = config()
            try {
                const response = await axios.get(`${apiUrl}getProfiledetail/${ID}`)
                setEmployeeData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        ProfileData()
    }, [ID])
    const [appraisal, setappraisalTable] = useState([]);

    const fetchAppraisalData = async (ID) => {
        const { apiUrl } = config()
        try {
            const response = await axios.get(`${apiUrl}getAppraisalTable/${ID}`)
            setappraisalTable(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchAppraisalData(ID);
    }, [ID]);
    return (
        <section className='min-h-screen'>
            <div className='bg-gray-50 min-h-screen'>
                <div className="container mx-auto p-5">
                    <h1 className="text-4xl font-medium pb-7">Profile</h1>
                    <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                            {employeeArray.map((data) => (
                                <div className="bg-white p-3 border-t-4 border-blue-400 shadow-lg">
                                    <div className="image overflow-hidden">
                                        <img className="h-auto w-full mx-auto" src={user} alt="" />
                                    </div>
                                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{data ? data.name : 'null'}</h1>
                                    <h3 className="text-gray-600 font-lg text-semibold leading-6">{data ? data.position : 'null'}</h3>
                                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{data ? data.desc : 'null'}</p>
                                    <ul
                                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li className="flex items-center py-3">
                                            <span>Status</span>
                                            <span className="ml-auto">
                                                <span className="bg-blue-500 py-1 px-2 rounded text-white text-sm">
                                                    {data ? data.status : 'null'}
                                                </span>
                                            </span>
                                        </li>
                                        <li className="flex items-center  justify-between py-3">
                                            <span>Member since</span>
                                            {data && data.join_date ? new Date(data.join_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'null'}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                            <div className="my-4"></div>
                        </div>
                        <div className="w-full md:w-9/12 mx-2 lg:h-64">
                            <div className="bg-white p-3 shadow-lg rounded-sm border-2">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-blue-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                <div className="text-gray-700">
                                    {employeeArray.map((data, index) => (
                                        <div className="grid md:grid-cols-2 text-sm">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">ID</div>
                                                <div className="px-4 py-2">{data.USERID}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Name</div>
                                                <div className="px-4 py-2">{data.name}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Gender</div>
                                                <div className="px-4 py-2">{data.gender}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                <div className="px-4 py-2">{data.contact}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Address</div>
                                                <div className="px-4 py-2">{data.address}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                                <div className="px-4 py-2">
                                                    {data && data.birthday ? new Date(data.birthday).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'null'}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Email</div>
                                                <div className="px-4 py-2" style={{ wordWrap: "break-word", wordBreak: "break-all", maxWidth: "95%" }}>
                                                    {data.email}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Verification Method</div>
                                                <div className="px-4 py-2">{data.verification}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="my-4"></div>
                            <div className="bg-white p-3 shadow-lg border-2 rounded-sm">
                                <div className="grid grid-cols-1">
                                    <div>
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                            <span clas="text-blue-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">Appraisals</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                                    <div className="overflow-x-auto">
                                                        <Table tableHeader={Headers} tableData={appraisal} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
