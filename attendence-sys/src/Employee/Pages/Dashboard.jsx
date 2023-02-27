import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DashboardCardData from '../../components/data/EDashboardCardData'
import DashboardCard from '../../components/cards/DashboardCard'
import TaskCard from '../../components/cards/TaskCard';
import task1 from '../../components/assets/task.jpg'
import project1 from '../../components/assets/project.jpg'
import axios from 'axios';
import { config } from "../../components/config/env"

export default function Dashboard(props) {
  const ID = props.ID
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
  const [project, setProject] = useState();
  const Project = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getAllProjectsCount/${ID}`)
      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [ID]);

  useEffect(() => {
    Project();
  }, [Project]);
  const [task, setTask] = useState();
  const Task = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getAlltaskCount/${ID}`)
      setTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [ID]);

  useEffect(() => {
    Task();
  }, [Task]);

  const [showTask, setshowTask] = useState([])
  const Data = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getTask/${ID}`)
      setshowTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [ID]);

  useEffect(() => {
    Data();
  }, [Data]);
  const [showProject, setshowProject] = useState([])
  const DataProject = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getProject/${ID}`)
      setshowProject(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [ID]);

  useEffect(() => {
    DataProject();
  }, [DataProject]);

  return (
    <section>
      <div className='bg-gray-100 min-h-screen'>
        <div className='container mx-auto p-5'>
          <h1 className='text-4xl font-medium pb-7'>Dashboard</h1>
          <div className='flex flex-wrap  gap-16'>
            {DashboardCardData.map(({ width, title, icon, color }) => {
              if (title === "Present in This Month") {
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
              else if (title === "Absent In This Month") {
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
              else if (title === "Projects") {
                return (
                  <DashboardCard
                    key={title}
                    width={width}
                    color={color}
                    icon={icon}
                    title={title}
                    value={project}
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
                  value={task}
                />
              );
            })}
          </div>
          <div className='mt-10 mb-5'>
            <div className='bg-white shadow-lg rounded-lg px-9 py-4 border-2'>
              <div className="flex flex-col ">
                <div className='flex justify-between mb-7 '>
                  <h1 className='text-xl font-semibold '>On Going Projects</h1>
                </div>
                <div className='flex flex-wrap mb-7 gap-5'>
                  {showProject.map((data) => (
                    data.Status === 'In Process' ? (
                      <TaskCard
                        key={data['Project Name']}
                        Eimg={project1}
                        title={data['Project Name']}
                        Dline={data.Deadline}
                      />
                    ) : null
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='mt-10 mb-5'>
            <div className='bg-white shadow-lg rounded-lg px-9 py-4 border-2'>
              <div className="flex flex-col">
                <div className='flex justify-between mb-7 '>
                  <h1 className='text-xl font-semibold '>On Going Tasks</h1>
                </div>
                <div className='flex flex-wrap mb-7  gap-5'>
                  {showTask.map((data) =>
                    data.Status === 'In Process' ? (
                      <TaskCard
                        key={data['Task Name']}
                        Eimg={task1}
                        title={data['Task Name']}
                        Dline={data.Deadline}
                      />
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
