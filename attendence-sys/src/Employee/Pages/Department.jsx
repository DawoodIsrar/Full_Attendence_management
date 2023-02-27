import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Table from '../../components/Table/ETable';
import { config } from "../../components/config/env"

function Department(props) {
    const Headers = props.Headers
    const ID = props.ID
    const [tableData, setTableData] = useState([]);
    const Data = useCallback(async () => {
        const { apiUrl } = config()
        if (props.name === 'Projects') {
            try {
                const response = await axios.get(`${apiUrl}getProject/${ID}`)
                setTableData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const response = await axios.get(`${apiUrl}getTask/${ID}`)
                setTableData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }, [props.name, ID]);

    useEffect(() => {
        Data();
    }, [Data, props.name]);

    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    }
    let filteredData = tableData.filter(item => {
        if (props.name === 'Projects') {
            return item["Project Name"]?.toLowerCase().includes(searchValue?.toLowerCase());
        } else if (props.name === 'Tasks') {
            return item["Task Name"]?.toLowerCase().includes(searchValue?.toLowerCase());
        }
        return item["Task Name"]?.toLowerCase().includes(searchValue?.toLowerCase());
    });

    return (
        <section>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-5">
                    <h1 className='text-4xl font-medium pb-7'>{props.name}</h1>
                    <div className="flex flex-col bg-white rounded-lg border-2 shadow-lg p-5">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-x-auto">
                                    <div className='flex justify-between items-center mb-5'>
                                        <div className="grid grid-cols-2 gap-5  xl:w-96 ">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                </div>
                                                <input type="search" id="default-search" className="block w-72 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder={`Search By ${props.name} Name`} onChange={handleSearch} required />
                                            </div>
                                        </div>
                                    </div>
                                    <Table tableHeader={Headers} tableData={filteredData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Department