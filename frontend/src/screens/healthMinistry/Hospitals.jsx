import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { DeleteOutline, AddCircleOutline, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllHospitals, getHospitalLoadingStatus, loadHospitals} from '../../store/entities/hospitals';
import './hospitals.css';

import { useState } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(hospital_id,name, contact, city, district, province) {
  return {
    hospital_id,
    name,
    contact,
    city,
    district,
    province,
  };
}

// const rows = [
//   createData(1, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
//   createData(2, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
//   createData(3, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
//   createData(4, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
//   createData(5, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
  
// ];

export default function Hospitals() {
  const dispatch = useDispatch()

  const hospital = useSelector(getAllHospitals)
  const hospitalsLoading = useSelector(getHospitalLoadingStatus);

  const [data, setData] = useState(hospital)
  const classes = useStyles();

  const handleDelete = (hospital_id)=>{
    setData(data.filter((item)=>item.hospital_id !== hospital_id));
  };

  useEffect(() => {
    dispatch(loadHospitals())

},[dispatch, hospital])

  return (
    <TableContainer component={Paper}>
      <Link to="/healthMinistry/addHospital"><button className="wardAddButton"><AddCircleOutline/>Add New Hospital</button></Link>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">NAME</TableCell>
            <TableCell align="left">CONTACT</TableCell>
            <TableCell align="left">DISTRICT</TableCell>
            <TableCell align="left">CITY</TableCell>
            <TableCell align="left">PROVINCE</TableCell>
            <TableCell align="left">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row._id}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.Contact[0]}</TableCell>
              <TableCell align="left">{row.address.district}</TableCell>
              <TableCell align="left">{row.address.city}</TableCell>
              <TableCell align="left">{row.address.province}</TableCell>

              <>
              <TableCell align="left">
                <Link to={"addHospitalAdmin/"+row._id}>
                <button className="wardListEdit" aria-label="edit" >
                  <AddCircleOutline/>Add Hospital Admin 
                </button></Link>
              </TableCell></>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
