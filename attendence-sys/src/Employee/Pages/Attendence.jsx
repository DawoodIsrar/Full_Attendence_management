import axios from "axios";
import React, { useCallback, useEffect, useState, Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import DashboardCard from "../../components/cards/DashboardCard";
import Table from '../../components/Table/Table2';
import EmployeeCardDetails from '../../components/data/EmployeeCardDetails'
import { Dialog, Transition } from '@headlessui/react'
import { CSVLink } from "react-csv";
import { config } from "../../components/config/env"

export default function Attendence(props) {
    const ID = props.ID
    const UpdateTable = async () => {
        const { apiUrl } = config()
        try {
            await axios.get(`${apiUrl}refreshData`)

        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UpdateTable()
    }, [])
    let [isOpenExport, setIsOpenExport] = useState(false)
    function closeExport() {
        setIsOpenExport(false)
    }
    function openExport() {
        setIsOpenExport(true)
    }
    const Headers = ["Employee ID", "Employee Name", "Position", "Date", "Entry Time", "Exit Time", "Overtime", "Remaining Hours", "Status"]
    const { name } = useParams();
    //Attendence Table Data
    const [tableData, setTableData] = useState([]);
    const TodayAttendence = useCallback(async () => {
        const { apiUrl } = config()
        try {
            const response = await axios.get(`${apiUrl}getEmployyeAllLogs/${ID}`)
            setTableData(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [ID]);

    useEffect(() => {
        TodayAttendence();
    }, [TodayAttendence]);
    const updatedTableData = tableData.map((data) => {
        return {
            ...data,
            Status: data['Entry Time'] ? "Present" : "Absent",
        };
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ExportData, setExportData] = useState([]);
    const handleDownload = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            return;
        }
        else {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
            const endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999);

            let result = updatedTableData.filter(d => {
                const dateString = `${d['Date']}`;
                const date = new Date(dateString);
                const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
                return startUTC <= dateUTC && dateUTC <= endUTC;
            });
            setExportData(result);
            console.log(ExportData)
            setTimeout(() => {
                document.getElementById("download-link").click();
            }, 0);
        }
    };

    const Attendence = useMemo(() => ({ USERID: ID }), [ID]);
    const [present, setPresent] = useState();
    const [absent, setAbsent] = useState();
    const Present = useCallback(async () => {
        const { apiUrl } = config()
        try {
            const response = await axios.post(`${apiUrl}getMonthlyAbsentOrPresent`, Attendence)
            setPresent(response.data[0].PresentDays);
            setAbsent(response.data[0].AbsentDays);
        } catch (error) {
            console.log(error);
        }
    }, [Attendence]);

    useEffect(() => {
        Present();
    }, [Present]);
    const [overtime, setovertime] = useState();
    const OVERTIME = useCallback(async () => {
        const { apiUrl } = config()
        try {
            const response = await axios.get(`${apiUrl}getEmployeeTOtalOvertime/${ID}`)
            setovertime(response.data[0].Overtime);
        } catch (error) {
            console.log(error);
        }
    }, [ID]);

    useEffect(() => {
        OVERTIME();
    }, [OVERTIME]);
    const [remaining, setremaining] = useState();
    const Remaining = useCallback(async () => {
        const { apiUrl } = config()
        try {
            const response = await axios.get(`${apiUrl}getEmployeeTOtalRemaining/${ID}`)
            setremaining(response.data[0].Remaining);
        } catch (error) {
            console.log(error);
        }
    }, [ID]);

    useEffect(() => {
        Remaining();
    }, [Remaining]);

    return (
        <section>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-5 ">
                    <h1 className="text-4xl font-medium pb-7">Attendence</h1>
                    <div className="mt-5 mb-10">
                        <div className='flex flex-wrap justify-center text-center gap-5'>
                            {EmployeeCardDetails.map(({ title, width, icon, color }) => {
                                if (title === "Present") {
                                    return (
                                        <DashboardCard
                                            key={title}
                                            width={width}
                                            color={color}
                                            icon={icon}
                                            title={title}
                                            value={present}
                                        />
                                    );
                                }
                                else if (title === "Absent") {
                                    return (
                                        <DashboardCard
                                            key={title}
                                            width={width}
                                            color={color}
                                            icon={icon}
                                            title={title}
                                            value={absent}
                                        />
                                    );
                                }
                                else if (title === "Leaves") {
                                    return (
                                        <DashboardCard
                                            key={title}
                                            width={width}
                                            color={color}
                                            icon={icon}
                                            title={title}
                                            value={absent}
                                        />
                                    );
                                }
                                else if (title === "Overtime") {
                                    return (
                                        <DashboardCard
                                            key={title}
                                            width={width}
                                            color={color}
                                            icon={icon}
                                            title={title}
                                            value={overtime + " hrs."}
                                        />
                                    );
                                }
                                return (
                                    <DashboardCard
                                        key={title}
                                        width={width}
                                        color={color}
                                        icon={icon}
                                        title={title}
                                        value={remaining + " hrs."}
                                    />
                                );
                            })}
                        </div>
                        <div className="bg-white border-2 shadow-xl rounded-lg px-9 mt-10">
                            <div className="flex flex-col ">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-x-auto rounded-lg">
                                            <div className="flex justify-between pt-3 mb-5">
                                                <div className="inset-0 flex items-center justify-start">
                                                    <button
                                                        type="button"
                                                        onClick={openExport}
                                                        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                    >
                                                        <i className="fa-sharp fa-solid fa-file-export pr-3" />Export Attendence
                                                    </button>
                                                    <Transition appear show={isOpenExport} as={Fragment}>
                                                        <Dialog as="div" className="relative z-10" onClose={closeExport}>
                                                            <Transition.Child
                                                                as={Fragment}
                                                                enter="ease-out duration-300"
                                                                enterFrom="opacity-0"
                                                                enterTo="opacity-100"
                                                                leave="ease-in duration-200"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                                                            </Transition.Child>

                                                            <div className="fixed inset-0 overflow-y-auto">
                                                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                                    <Transition.Child
                                                                        as={Fragment}
                                                                        enter="ease-out duration-300"
                                                                        enterFrom="opacity-0 scale-95"
                                                                        enterTo="opacity-100 scale-100"
                                                                        leave="ease-in duration-200"
                                                                        leaveFrom="opacity-100 scale-100"
                                                                        leaveTo="opacity-0 scale-95"
                                                                    >
                                                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                                            <form onSubmit={handleDownload}>
                                                                                <div className="mt-2 flex justify-center items-center">
                                                                                    <label htmlFor="start" className='pr-4'>Start </label>
                                                                                    <br />
                                                                                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className='border-2 bg-white  border-blue-300 text-gray-900 text-sm rounded-lg p-2.5' placeholder="Select date" required />
                                                                                    <label htmlFor="end" className='px-4'>to</label>
                                                                                    <br />
                                                                                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className='border-2 bg-white  border-blue-300 text-gray-900 text-sm rounded-lg p-2.5' placeholder="Select date" required />
                                                                                </div>
                                                                                <div className="mt-4 flex justify-center">
                                                                                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                                                        Export
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                            <CSVLink id="download-link" data={ExportData} headers={Headers} filename={`${name} Attendence`} />
                                                                        </Dialog.Panel>
                                                                    </Transition.Child>
                                                                </div>
                                                            </div>
                                                        </Dialog>
                                                    </Transition>
                                                </div>
                                            </div>
                                            <Table tableHeader={Headers} tableData={updatedTableData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
