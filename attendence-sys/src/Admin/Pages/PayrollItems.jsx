import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from '../../components/Table/Table5';
import { config } from "../../components/config/env"

export default function PayrollItems() {
  const options = useMemo(() => {
    return { month: 'short', day: '2-digit', year: 'numeric' };
  }, []);
  const [Bonus, setBonus] = useState([]);
  const BonusTable = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}showBonus`);
      const updatedSalary = response.data.map(salaryData => {
        const date = new Date(salaryData["Bonus Month"]);
        const month = date.toLocaleString('en-US', options);
        return {
          ...salaryData,
          'Bonus Month': ` ${month}`
        };
      });
      setBonus(updatedSalary);
    } catch (error) {
      console.log(error);
    }
  }, [options]);

  useEffect(() => {
    BonusTable();
  }, [BonusTable]);

  const [Overtime, setOvertime] = useState([]);
  const overtimeTable = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}showOvertime`);
      const updatedSalary = response.data.map(salaryData => {
        const date = new Date(salaryData["Month"]);
        const month = date.toLocaleString('en-US', options);
        return {
          ...salaryData,
          'Month': `${month}`
        };
      });
      setOvertime(updatedSalary);
    } catch (error) {
      console.log(error);
    }
  }, [options]);

  useEffect(() => {
    overtimeTable();
  }, [overtimeTable]);

  const [deduction, setDeduction] = useState([]);
  const deductionTable = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}showDeduction`);
      const updatedSalary = response.data.map(salaryData => {
        const date = new Date(salaryData["Deduction Month"]);
        const month = date.toLocaleString('en-US', options);
        return {
          ...salaryData,
          'Deduction Month': `${month}`
        };
      });
      setDeduction(updatedSalary);
    } catch (error) {
      console.log(error);
    }
  }, [options]);

  useEffect(() => {
    deductionTable();
  }, [deductionTable]);


  const AdditionsHeader = ["Employee ID", "Employee Name", "Bonus Month", "Bonus"]
  const OvertimeHeader = ["Employee ID", "Employee Name", "Month", "Rate"]
  const DeductionsHeader = ["Employee ID", "Employee Name", "Deduction Month", "Deduction"]
  const [openTab, setOpenTab] = React.useState(1);

  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }
  let filteredData = Bonus.filter(item => {
    return (
      item["Employee Name"].toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  let filteredDataOvertime = Overtime.filter(item => {
    return (
      item["Employee Name"].toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  let filteredDataDeduction = deduction.filter(item => {
    return (
      item["Employee Name"].toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <section>
      <div className='bg-gray-50 min-h-screen'>
        <div className="container mx-auto p-5">
          <h1 className="text-4xl font-medium pb-7">Payroll Items</h1>
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(1); }}
                    data-toggle="tab" href="#link1" role="tablist">
                    Additions
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(2); }}
                    data-toggle="tab" href="#link2" role="tablist">
                    Overtime
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 3 ? "text-white bg-blue-600" : "text-black bg-white")}
                    onClick={e => { e.preventDefault(); setOpenTab(3); }}
                    data-toggle="tab" href="#link3" role="tablist">
                    Deductions
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ">
                <div className="py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      <div className="flex flex-col bg-white rounded-lg border-2 shadow-lg p-5">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                              <div className='flex justify-between items-center mb-5'>
                                <div className=" xl:w-96 ">
                                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search" onChange={handleSearch} />
                                  </div>
                                </div>
                              </div>
                              <Table tableHeader={AdditionsHeader} appraisalTable={filteredData} link={"Update_Addition"} month={"Bonus Month"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <div className="flex flex-col bg-white rounded-lg border-2 shadow-lg p-5">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                              <div className='flex justify-between items-center mb-5'>
                                <div className=" xl:w-96 ">
                                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search" onChange={handleSearch} />
                                  </div>
                                </div>
                              </div>
                              <Table tableHeader={OvertimeHeader} appraisalTable={filteredDataOvertime} link={"Update_Overtime"} month={"Month"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                      <div className="flex flex-col bg-white rounded-lg border-2 shadow-lg p-5">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                              <div className='flex justify-between items-center mb-5'>
                                <div className=" xl:w-96">
                                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Search" onChange={handleSearch} />
                                  </div>
                                </div>
                              </div>
                              <Table tableHeader={DeductionsHeader} appraisalTable={filteredDataDeduction} link={"Update_Deductions"} month={"Deduction Month"} />
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
      </div>
    </section>
  );
};
