import React from 'react'
import SideBar from './SideBar'
import { Routes, Route } from "react-router-dom";
import Dashboard from '../Pages/Dashboard'
import Navbar from '../../components/Navbar/Navbar';
import Attendence from '../Pages/Attendence';
import Department from '../Pages/Department';
import DataTable from '../Pages/SalaryTable';
import LoansEnpenses from '../Pages/LoansEnpenses';
import ApplyLoan from '../Pages/ApplyLoan';
import Appraisal from '../Pages/Appraisal';
import Profile from '../Pages/Profile';
import ViewAppraisal from '../Pages/ViewAppraisal';
import Report from '../Pages/Report';

function SideBarRoutes() {
  const PHeaders = ["Employee ID", "Employee Name", "Project Name", "Assign Date", "Deadline", "Status"]
  const THeaders = ["Employee ID", "Employee Name", "Task Name", "Description", "Assign Date", "Deadline", "Status"]
  const ID = window.sessionStorage.getItem("id");
  const UserName = window.sessionStorage.getItem("userName");

  return (
    <>
      <SideBar>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard ID={ID} />} />
          <Route path="/Attendence" element={<Attendence ID={ID} />} />
          <Route path='/Projects' element={<Department ID={ID} name={"Projects"} itemName={"Project Name"} Headers={PHeaders} />}></Route>
          <Route path='/Tasks' element={<Department ID={ID} name={"Tasks"} itemName={"Task Name"} Headers={THeaders} />}></Route>
          <Route path='/Appraisal' element={<Appraisal ID={ID} />}></Route>
          <Route path='/Appraisal/View_Appraisal/:Date' element={<ViewAppraisal ID={ID} />} />
          <Route path='/SalaryTable' element={<DataTable ID={ID} />}></Route>
          <Route path='/Reports' element={<Report />}></Route>
          <Route path='/loans&expenses' element={<LoansEnpenses ID={ID} />}></Route>
          <Route path='/apply' element={<ApplyLoan Name={UserName} ID={ID} />}></Route>
          <Route path='/Profile' element={<Profile ID={ID} />}></Route>
        </Routes>
      </SideBar>
    </>
  )
}
export default SideBarRoutes