import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from "@mui/material"; // import js elements from mui
import axios from 'axios'
import { formToJSON } from 'axios';

const values = JSON.stringify({
    fname: 'Nicholas',
    lname: 'Gustin',
    dob: '06/06/2003',
    email: 'nicholas@gustin.com', 
    password: 'password'
});

function Test() {
    
    axios.post("127.0.0.1/test", json, {
        
        values
    })
    .then(function (response) {
        console.log(response)
    }) 
    
    return (
        <div>
            <p>{values.fname}</p>
            <p>{values.lname}</p>
            <p>{values.dob}</p>
            <p>{values.email}</p>
            <p>{values.password}</p>
        </div>
    );
}
export default Test