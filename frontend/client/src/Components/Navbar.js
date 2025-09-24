import React, {useEffect, useState} from "react";
import { demouser } from "../Assets/index";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';                            

const Navbar = ({ pagename }) => {
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [ data, setData ] = useState({});
  const navigate = useNavigate();

  const fetchLuckyNumber = async () => {

    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
    }
    };

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  }


  
  useEffect(() => {
    fetchLuckyNumber();
    if(token === ""){
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  return (
    <nav className="bg-white flex items-center justify-between h-20 px-8 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-500">{pagename}</h1>
      </div>
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-4">
          <img src={demouser} alt="avatar" className="rounded-full h-8 w-8" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium">{data.msg}</span>
          <span>Super Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
