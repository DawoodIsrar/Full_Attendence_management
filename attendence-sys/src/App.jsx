import React, { useEffect } from 'react'
import { useState } from 'react'
import Login from './Login'
import SideBar from './Admin/Sidebar/SideBarRoutes';
import EmpSideBar from './Employee/Sidebar/SideBarRoutes';


function App() {
  const [token, setToken] = useState();
  const [id, setid] = useState();
  const [role, setRole] = useState();
  const [userName, setuserName] = useState();

  useEffect(() => {
    const tokenFromStorage = window.sessionStorage.getItem("token");
    const idFromStorage = window.sessionStorage.getItem("id");
    const roleFromStorage = window.sessionStorage.getItem("role");
    const userNameFromStorage = window.sessionStorage.getItem("userName");

    setToken(tokenFromStorage);
    setid(idFromStorage);
    setRole(roleFromStorage);
    setuserName(userNameFromStorage)

  }, [id, userName]);
  if (token) {
    if (role === "ROLE_ADMIN") {
      return <SideBar />

    }
    else {
      return <EmpSideBar />

    }
  }
  // if(!token){
  // }
  else if (!token)
    return (
      <Login />
    );
}

export default App
