import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../components/assets/darklogo.png";
import { config } from "../../components/config/env"

function Slip() {
  const { ID } = useParams();
  const [Salary, setSalary] = useState([]);
  const SalaryTable = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}salarySlipformonth/${ID}`);
      setSalary(response.data[0])
      console.log(response.data[0])
    } catch (error) {
      console.log(error);
    }
  }, [ID]);

  useEffect(() => {
    SalaryTable();
  }, [SalaryTable]);

  return (
    <section>
      <div className="p-5 bg-gray-50">
        <div className="bg-white rounded shadow-lg p-5" id='printablediv' >
          <div className=" flex flex-col items-center pb-6">
            <div className="w-72 p-5">
              <img src={logo} alt="logo" />
            </div>
            <div className="flex justify-center font-medium text-xl">
              <h1>
                Cyber Sync Technologies
              </h1>
            </div>
            <div className="pt-2">
              <p className="text-sm text-gray-500 text-center">
                Industrial State, KPIT Board, Phase 5 Hayatabad, Peshawar
              </p>
            </div>
          </div>
          <div className="p-10">

            <div className="flex justify-center pt-5">

              <table className="w-64 text-sm font-medium">
                <tbody>
                  <tr>
                    <td className="px-2 py-1">
                      <div className="text-gray-900 whitespace-no-wrap flex justify-between px-5">
                        <h1 className="font-medium">Name:</h1>
                        <p>{Salary["Employee Name"]}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1  bg-white">
                      <div className="text-gray-900 whitespace-no-wrap flex justify-between px-5">
                        <h1 className="text-sm font-medium">Position:</h1>
                        <p>{Salary["Position"]}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 pb-2 bg-white">
                      <div className="text-gray-900 whitespace-no-wrap flex justify-between px-5">
                        <h1 className="text-sm font-medium">Date:</h1>
                        <p>{Salary["Salary Month"]}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid  gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2 pt-10">
              <div className="p-5">
                <div className="mb-5">
                  <h1 className="text-lg font-medium">Earnings:</h1>
                </div>
                <div>
                  <table className="min-w-full leading-normal border border-slate-500">
                    <tbody>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Basic Salary</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p>Rs {Salary["BasicSalary"]}/-</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Bonus</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p>Rs {Salary["Bonus"]}/-</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Overtime Hours</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p>{Salary["OvertimeHours"]?.toFixed(2)} Hours</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Overtime Rate Per Hour</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p>Rs {Salary["OvertimeRate"]}/-</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Overtime Amount</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p>Rs{Salary["overtimePay"]?.toFixed(2)}/-</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Total Working Hours</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p>{Salary["total_hours_in_month"]} Hours</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Working Hours Completed</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p>{Salary["total_hours_completed_month"]?.toFixed(1)} Hours</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-sm font-medium">Remaining Hours</h1>
                            </div>
                            <div>
                              <span className="text-end">
                              <p>{Salary["remainings_hours"]?.toFixed(2)} Hours</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-lg font-medium">Total Earnings</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p className="text-lg font-medium">Rs{Salary["TotalSalary"]?.toFixed(2)}/-</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-5">
                  <h1 className="text-lg font-medium">Deductions:</h1>
                </div>
                <div>
                  <table className="min-w-full leading-normal border border-slate-500">
                    <tbody>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <h1 className="text-sm"><span className="font-medium">Remaining Hours Deduction:</span></h1>
                            <p>Rs {Salary.deduction}/-</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <h1 className="text-sm"><span className="font-medium">Absentees Deduction:</span> </h1>
                            <p>Rs {Salary.absent}/-</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <h1 className="text-sm"><span className="font-medium">Loan/Advance Deduction:</span> {Salary.Reason}</h1>
                            <p>Rs {Salary.loan}/-</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-2 border bg-white text-sm">
                          <div className="text-gray-900 whitespace-no-wrap flex justify-between">
                            <div>
                              <h1 className="text-lg font-medium">Total Deductions</h1>
                            </div>
                            <div>
                              <span className="text-end">
                                <p className="text-lg font-medium">Rs{Salary["Total Deduction"]?.toFixed(2)}/-</p>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <h1 className="text-xl font-medium text-center">Net Salary: Rs {Salary["NetSalary"]?.toFixed(2)}/-</h1>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Slip;
