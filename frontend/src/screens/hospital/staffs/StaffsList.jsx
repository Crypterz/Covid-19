import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { DeleteOutline } from "@material-ui/icons";
import {Link} from "react-router-dom";
import './staffList.css';
import { useState } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(staff_id, first_name, last_name, hospital_name, email) {
  return {
    staff_id,
    first_name,
    last_name,
    hospital_name,
    email,
  };
}

const rows = [
  createData(1, 'John', 'David', 'ABC hospital', 'john@gmail.com'),
  createData(2, 'John', 'David', 'ABC hospital', 'john@gmail.com'),
  createData(3, 'John', 'David', 'ABC hospital', 'john@gmail.com'),
  createData(4, 'John', 'David', 'ABC hospital', 'john@gmail.com'),
  createData(5, 'John', 'David', 'ABC hospital', 'john@gmail.com'),
  
];

export default function StaffList() {
  const [data, setData] = useState(rows)
  const classes = useStyles();

  const handleDelete = (staff_id)=>{
    setData(data.filter((item)=>item.staff_id !== staff_id));
  };

  return (
    <TableContainer component={Paper}>
      <Link to="/hospital/addHospitalStaff"><button className="staffAddButton">New Staff</button></Link>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last name</TableCell>
            <TableCell align="left">Hospital Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.staff_id}>
              <TableCell component="th" scope="row">
                {row.staff_id}
              </TableCell>
              <TableCell align="left">{row.first_name}</TableCell>
              <TableCell align="left">{row.last_name}</TableCell>
              <TableCell align="left">{row.hospital_name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>

              <>
              <TableCell align="left">
                <Link to={"/staffs/"+row.staff_id}>
                <button className="staffListEdit" aria-label="edit" >
                  Edit 
                </button></Link><DeleteOutline className="staffListDelete" onclick={()=>handleDelete(data.staff_id)}/>
              </TableCell></>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
