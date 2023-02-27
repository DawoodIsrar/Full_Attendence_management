import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeCard(props) {
    const { name, ID } = props
    return (
        <div className={`w-64 p-5 bg-white rounded-lg shadow-md shadow-blue-500`}>
            <span className="flex justify-center text-3xl text-white ">
                <Link to={`/Employee/Profile/${name}/${ID}`}><i className="shadow-lg rounded-lg p-3 bg-blue-500 shadow-blue-500 fa-sharp fa-solid fa-user"></i></Link>
            </span>
            <h5 className="mb-2 mt-5 justify-center flex text-lg  tracking-tight text-gray-500 dark:text-white">{name}</h5>
            <div className="flex justify-center pt-4">
                <Link to={`/Employee/${name}/${ID}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center">
                        View
                    </button>
                </Link>
            </div>
        </div>
    );
}
