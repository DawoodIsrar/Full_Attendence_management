import React, { useState, useEffect } from 'react'
import Table from '../../components/Table/Table2';
import axios from 'axios'
import { CSVLink } from 'react-csv'
import DashboardCardData from '../../components/data/DashboardCardData'
import DashboardCard from '../../components/cards/DashboardCard'
import { config } from "../../components/config/env"

export default function Dashboard() {

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

  //Total Employees Card data
  const [totalEmployees, setTotalEmployees] = useState("");
  const TotalEmployees = async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getTotleEmpCount`)
      setTotalEmployees(response.data[0].totalEmp);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    TotalEmployees()
  }, [])

  //OnTime Card Data
  const [onTime, setonTime] = useState("");
  const OnTime = async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getTodayAttendeeOnTimeCount`)
      setonTime(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    OnTime()
  }, [])

  //Late Card data
  const [late, setLate] = useState("");
  const Late = async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getTodayLateAttendeeCount`)
      setLate(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    Late()
  }, [])

  //Absent Card data
  const [Absent, setAbsent] = useState("");
  const absent = async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getTodayAPresentAndAbsent`)
      setAbsent(response.data[0].absent_user);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    absent()
  }, [])
  //Department Card data
  const [Department, setDepartment] = useState("");
  const department = async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getTotalDepartCount`)
      setDepartment(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    department()
  }, [])
  //Todays Attendence Table Data
  const [tableData, setTableData] = useState([]);
  const TodayAttendence = async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getTodayAttendeelogs`)
      setTableData(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    TodayAttendence()
  }, [])

  const Headers = ["Employee ID", "Employee Name", "Date", "Entry Time", "Exit Time", "Overtime", "Status"];
  const updatedTableData = tableData.map((data) => {
    return {
      ...data,
      Status: data['Entry Time'] > "09:15" ? <p className='bg-red-100 border-red-400 border-2 rounded-full px-3 py-1 text-red-500'>Late</p> : <p className='bg-green-100 border-green-400 border-2 rounded-full px-2 py-1 text-green-500'>On Time</p>,
    };
  });
  return (
    <section>
      <div className='bg-gray-100 min-h-screen'>
        <div className='container px-auto p-5'>
          <h1 className='text-4xl font-medium pb-7 pl-6'>Dashboard</h1>
          <div className='flex flex-wrap justify-center gap-8 ml-7'>
            {DashboardCardData.map(({ width, title, value, icon, color }) => {
              if (title === "Departments") {
                return (
                  <DashboardCard
                    key={title}
                    width={width}
                    color={color}
                    icon={icon}
                    title={title}
                    value={Department}
                  />
                );
              }
              else if (title === "Total Employees") {
                return (
                  <DashboardCard
                    key={title}
                    width={width}
                    color={color}
                    icon={icon}
                    title={title}
                    value={totalEmployees}
                  />
                );
              }
              else if (title === "On Time Today") {
                return (
                  <DashboardCard
                    key={title}
                    width={width}
                    color={color}
                    icon={icon}
                    title={title}
                    value={onTime}
                  />
                );
              }
              else if (title === "Late Today") {
                return (
                  <DashboardCard
                    key={title}
                    width={width}
                    color={color}
                    icon={icon}
                    title={title}
                    value={late}
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
                  value={Absent}
                />
              );
            })}
          </div>
          <div className='mt-10 mb-5 ml-7'>
            <div className='bg-white shadow-lg rounded-lg px-9 py-4 border-2'>
              <div className="flex flex-col ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto rounded-lg">
                      <div className='flex justify-between mb-5 '>
                        <div>
                          <h1 className='text-xl font-semibold '>Today's Attendence</h1>
                        </div>
                        <div className='flex gap-4'>
                          <CSVLink data={tableData} headers={Headers} filename={`Today's Attendence`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                              <span>Download</span>
                            </button>
                          </CSVLink>

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
  )
}
