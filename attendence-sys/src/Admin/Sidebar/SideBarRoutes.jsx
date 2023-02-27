import React from 'react'
import SideBar from './SideBar'
import { Routes, Route } from "react-router-dom";
import Dashboard from '../Pages/Dashboard'
import Employee from '../Pages/Employee'
import EmployeeDetails from '../Pages/EmployeeDetails'
import Navbar from '../../components/Navbar/Navbar';
import AddEmployee from '../Pages/AddEmployee';
import AddAppraisal from '../Pages/AddAppraisal';
import EmployeeProfile from '../Pages/EmployeeProfile';
import ViewAppraisal from '../Pages/ViewAppraisal';
import Form from '../../components/Form/Form';
import Slip from '../Pages/Slip';
import DataTable from '../Pages/SalaryTable';
import PayrollItems from '../Pages/PayrollItems';
import LoansEnpenses from '../Pages/LoansEnpenses';
import ApplyLoan from '../Pages/ApplyLoan';
import Department from '../Pages/Department';
import PreviousMonth from '../Pages/PreviousMonth';
import SalaryForm from '../../components/Form/SalaryForm';
import UpdateSalary from '../../components/Form/UpdateSalary';
import AddDepartment from '../../components/Form/AddDepartment';
import AddTask from '../../components/Form/AddTask';
import Profile from '../../Employee/Pages/Profile'

function SideBarRoutes() {
  const DHeaders = ["Department ID", "Department Name", "Description"]
  const PHeaders = ["Employee ID", "Employee Name", "Project Name", "Assign Date", "Deadline", "Status"]
  const THeaders = ["Employee ID", "Employee Name", "Task Name", "Assign Date", "Deadline", "Status"]
  const ID = window.sessionStorage.getItem("id");


  return (
    <>
      <SideBar>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Employee/:name/:ID" element={<EmployeeDetails />} />
          <Route path="/Employee/Profile/:name/:ID" element={<EmployeeProfile />} />
          <Route path='/Employee/Add_Employee/:name/:ID' element={<AddEmployee name={"Add Details"} />} />
          <Route path='/Employee/Update_Employee/:name/:ID' element={<AddEmployee name={"Update Details"} />} />
          <Route path='/Add_Appraisal' element={<AddAppraisal />} />
          <Route path='/Employee/Profile/View_Appraisal/:ID/:Date' element={<ViewAppraisal />} />
          <Route path='/Salary' element={<DataTable />}></Route>
          <Route path='/Salary/AddSalary' element={<SalaryForm />}></Route>
          <Route path='/Salary/PreviousSalary' element={<PreviousMonth />}></Route>
          <Route path='/Salary/UpdateSalary/:name/:date' element={<UpdateSalary />}></Route>
          <Route path='/Payroll_Item/Update_Addition/:name/:date' element={<Form name={"Additions"} type={"Bonus"} input={'bonus'} />}></Route>
          <Route path='/Payroll_Item/Update_Overtime/:name/:date' element={<Form name={"Overtime"} type={"Overtime Rate"} input={'overtime_rate'} />}></Route>
          <Route path='/Payroll_Item/Update_Deductions/:name/:date' element={<Form name={"Deductions"} type={"Deduction"} input={'deduction'} />}></Route>
          <Route path='/slips/:ID' element={<Slip />}></Route>
          <Route path='/Payroll_Item' element={<PayrollItems />}></Route>
          <Route path='/loans&expenses' element={<LoansEnpenses />}></Route>
          <Route path='/Apply' element={<ApplyLoan />}></Route>
          <Route path='/Department' element={<Department name={"Departments"} itemName={"Department Name"} Headers={DHeaders} link={"addDepartment"} updateLink={"UpdateDepartment"} />}></Route>
          <Route path='/Projects' element={<Department name={"Projects"} itemName={"Project Name"} Headers={PHeaders} link={"addProjects"} updateLink={"UpdateProject"} />}></Route>
          <Route path='/Tasks' element={<Department name={"Tasks"} itemName={"Task Name"} Headers={THeaders} link={"addTasks"} updateLink={"UpdateTask"} />}></Route>
          <Route path='/Department/addDepartment' element={<AddDepartment name={"Add"} />}></Route>
          <Route path='/Department/UpdateDepartment/:index' element={<AddDepartment name={"Update"} />}></Route>
          <Route path='/Projects/addProjects' element={<AddTask name={"Add Project"} field={"Project"} />}></Route>
          <Route path='/Projects/UpdateProject/:index/:Name/:ID' element={<AddTask name={"Update Project"} field={"Project"} />}></Route>
          <Route path='/Tasks/addTasks' element={<AddTask name={"Add Task"} field={"Task"} />}></Route>
          <Route path='/Tasks/UpdateTask/:index/:Name/:ID' element={<AddTask name={"Update Task"} field={"Task"} />}></Route>
          <Route path='/Profile' element={<Profile ID={ID} />}></Route>
        </Routes>
      </SideBar>
    </>
  )
}
export default SideBarRoutes