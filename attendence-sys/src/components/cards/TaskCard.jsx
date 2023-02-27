import React from "react";

export default function TaskCard(props) {
  const { title, value, Dline, Eimg } = props

  return (
    <div className={`w-72  bg-white rounded-lg border-2`}>
      <img src={Eimg} className="rounded-md " alt="" />
      <h5 className="mb-2 mt-5 justify-center flex text-2xl  tracking-tight text-gray-500 dark:text-white">{title}</h5>
      <p className=" mb-3 text-sm text-gray-700 dark:text-gray-400 flex justify-center">{value}</p>
      <p className=" mb-3 font-medium text-sm text-gray-700 dark:text-gray-400 flex justify-center">Deadline: {Dline}</p>
    </div>
  );
}
