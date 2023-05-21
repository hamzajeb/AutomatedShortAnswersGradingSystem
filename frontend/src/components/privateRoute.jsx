
import {Outlet, Navigate} from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Img7 from './img/img7.jpg';
import {useQuery} from '@apollo/client';

import "./css/Navbar.css";

import { CURRENT_USER, LOGOUT_USER } from '../GraphQl/Queries';
const PrivateRoute = () => {
    const [x, setX] = React.useState(0);
    const {error,loading,data}=useQuery(CURRENT_USER,  {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            console.log(data)
            setX(0)
        },
        context: {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
        notifyOnNetworkStatusChange: true, // did the work
        onError: (error) => {
          console.log(error);
          setX(1)
        },
      })
let auth= {'token':Cookies.get("token")}
return(
    x === 0 ? <Outlet/> : <Navigate to="/"/>
)
}
export default PrivateRoute