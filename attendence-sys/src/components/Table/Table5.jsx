import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal2';
export default function Table(props) {
    const appraisalTable = props.appraisalTable;
    const [Data, setData] = useState(appraisalTable)
    const tableHeader = props.tableHeader;
    const link = props.link;
    const month = props.month;
    useEffect(() => {
        setData(appraisalTable);
    }, [appraisalTable]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = Data.slice(indexOfFirstRecord, indexOfLastRecord);
    const changePage = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(Data.length / recordsPerPage);
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
        <section >
            <table className="min-w-full">
                <thead className="bg-blue-500 text-white text-center">
                    <tr className='text-center'>
                        {tableHeader.map((header, index) => (
                            <th key={index} className="text-sm font-medium px-6 py-4">{header}</th>
                        ))}
                        <th className="text-sm font-medium px-6 py-4">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 text-center">
                            {tableHeader.map((header, index) => (
                                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                                    {row[header]}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 ">
                                <Modal index={index} Data={Data} setData={setData} id={Data[index]['Employee ID']} name={Data[index]['Employee Name']} date={Data[index][month]} link={link} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-8">
                {Data.length > recordsPerPage && (
                    <nav aria-label="Page navigation example" className='md:flex md:justify-center'>
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
        </section>
    )
}