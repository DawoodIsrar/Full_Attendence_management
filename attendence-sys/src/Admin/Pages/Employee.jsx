import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import EmployeeCard from '../../components/cards/EmployeeCard'
import { config } from "../../components/config/env"

export default function Employee() {
  //Employee Card
  const [empCard, setEmpCard] = useState([]);
  const namesDataRef = useRef([]);
  const EmployeeCards = useCallback(async () => {
    const { apiUrl } = config()
    try {
      const response = await axios.get(`${apiUrl}getName`)
      const names = response.data.all_users;
      namesDataRef.current = [...names];
      setEmpCard(namesDataRef.current);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    EmployeeCards();
  }, [EmployeeCards]);
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }
  let filteredData = [];
  if (searchValue) {
    filteredData = empCard.filter(item => {
      return item["NAME"].toLowerCase().includes(searchValue.toLowerCase());
    });
  } else {
    filteredData = empCard;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const changePage = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <li key={i} aria-current={i === currentPage ? "page" : undefined}>
        <button
          className={`px-3 py-2 leading-tight ${i === currentPage
            ? "text-white  bg-blue-500 "
            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            }`}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      </li>
    );
  }
  return (
    <section>
      <div className='bg-gray-100 min-h-screen min-w-full px-auto p-5'>
        <div className='container '>
          <h1 className='text-4xl font-medium pb-7 pl-6'>Employees</h1>
          <div className='flex justify-center items-center mb-3'>
            <div className="grid grid-cols-1 gap-9  xl:w-96 ">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={handleSearch} placeholder="Search By Name" />
              </div>
            </div>
          </div>
          <div className='flex flex-wrap justify-center gap-4 py-9'>
            {currentRecords.map((data) => (
              <EmployeeCard
                key={data.USERID}
                name={data.NAME}
                ID={data.USERID}
              />
            ))}
          </div>
          <div className="mt-5 pb-5">
            {filteredData.length > recordsPerPage && (
              <nav aria-label="Page navigation example" className='flex justify-center'>
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <button className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 " onClick={() => { if (currentPage > 1) { changePage(currentPage - 1) } }}>
                      <span className="sr-only">Previous</span>
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </button>
                  </li>
                  {pageButtons}
                  <li>
                    <button className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 " onClick={() => { if (currentPage + 1 <= totalPages) { changePage(currentPage + 1) } }}>
                      <span className="sr-only">Next</span>
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
