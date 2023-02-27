import React from "react";

export default function DashboardCard(props) {
  const { color, icon, title, value, width } = props

  return (
    <div className={`${width} p-5 bg-white rounded-lg shadow-md shadow-${color}-500`}>
      <span className="flex justify-center text-4xl text-white ">{icon}</span>
      <h5 className="mb-2 mt-5 justify-center flex text-2xl  tracking-tight text-gray-500 dark:text-white">{title}</h5>
      <p className="font-semibold mb-3 text-3xl text-gray-700 dark:text-gray-400 flex justify-center">{value}</p>
    </div>
  );
}
