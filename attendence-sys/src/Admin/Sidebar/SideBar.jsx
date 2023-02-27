import { useState } from "react";
import logo from '../../components/assets/company_logo.png'
import control from '../../components/assets/control.png'
import { NavLink } from 'react-router-dom';
const SideBar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", icon: <i className="fa-sharp fa-solid fa-house" />, path: '/' },
    { title: "Employee", icon: <i className="fa-sharp fa-solid fa-users" />, path: '/Employee' },
    { title: "Add Appraisal", icon: <i className="fa-sharp fa-solid fa-check-to-slot"></i>, path: '/Add_Appraisal' },
  ];
  const payroll = [
    { title: "Salary", icon: <i className="fa-sharp fa-solid fa-table"></i>, path: '/Salary' },
    // { title: "Slips", icon: <i className="fa-sharp  fa-regular fa-note-sticky"></i>, path: '/slips' },
    { title: "Payroll Items", icon: <i className="fa-sharp fa-solid fa-sack-dollar"></i>, path: '/Payroll_Item' },
    { title: "Loan & Expenses", icon: <i className="fa-sharp fa-solid fa-money-bill"></i>, path: '/loans&expenses' },
  ];
  const departments = [
    { title: "Department", icon: <i className="fa-sharp fa-solid fa-building-user"></i>, path: '/Department' },
    { title: "Projects", icon: <i className="fa-sharp fa-solid fa-diagram-project"></i>, path: '/Projects' },
    { title: "Tasks", icon: <i className="fa-sharp fa-solid fa-list-check"></i>, path: '/Tasks' },
  ];

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple p-5 min-h-screen pt-8 relative duration-300`}
      >
        <div>


          <img
            src={control} alt=""
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={logo} alt=""
              className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                }`}
            />
          </div>
          <ul className="pt-6 ">
            <p className="text-white text-xs"> Menu</p>
            {Menus.map((Menu, index) => (
              <NavLink to={Menu.path} key={index}  >
                <li
                  className={`flex  rounded-md p-2 cursor-pointer  hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"}`}
                >
                  <p className="text-white text-lg">{Menu.icon}</p>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
          <ul className="pt-6">
            <p className="text-white text-xs"> Dept.</p>
            {departments.map((departments, index) => (
              <NavLink to={departments.path} key={index}  >
                <li
                  className={`flex  rounded-md p-2 cursor-pointer  hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${departments.gap ? "mt-9" : "mt-2"}`}
                >
                  <p className="text-white text-lg">{departments.icon}</p>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {departments.title}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
          <ul className="pt-6 ">
            <p className="text-white text-xs"> Payroll</p>
            {payroll.map((payroll, index) => (
              <NavLink to={payroll.path} key={index}  >
                <li
                  className={`flex  rounded-md p-2 cursor-pointer  hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${payroll.gap ? "mt-9" : "mt-2"}`}
                >
                  <p className="text-white text-lg">{payroll.icon}</p>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {payroll.title}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>

        </div>
      </div>
      <div className=" flex-1">
        <main className='min-h-screen'>{children}</main>
      </div>
    </div>
  );
};
export default SideBar;
