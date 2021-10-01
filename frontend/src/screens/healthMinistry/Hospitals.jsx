/**
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import WardDataService from "../../../services/WardService";
import { Link} from 'react-router-dom'


const WardsList = (props) => {
  const [wards, setWards] = useState([]);
  const [searchWardName, setSearchWardName] = useState("");
  const wardsRef = useRef();

  wardsRef.current = wards;

  useEffect(() => {
    retrieveWards();
  }, []);

  const onChangeSearchWardName = (e) => {
    const searchWardName = e.target.value;
    setSearchWardName(searchWardName);
  };

  const retrieveWards = () => {
    WardDataService.getAll()
      .then((response) => {
        setWards(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveWards();
  };

  const removeAllWards = () => {
    WardDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByWardName = () => {
    WardDataService.findByWardName(searchWardName)
      .then((response) => {
        setWards(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openWard = (rowIndex) => {
    const id = wardsRef.current[rowIndex].id;

    props.history.push("/wards/" + id);
  };

  const deleteWard = (rowIndex) => {
    const id = wardsRef.current[rowIndex].id;

    WardDataService.remove(id)
      .then((response) => {
        props.history.push("/wards");

        let newWards = [...wardsRef.current];
        newWards.splice(rowIndex, 1);

        setWards(newWards);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  

  const columns = useMemo(
    () => [
      {
        Header: "Ward Name",
        accessor: "ward_name",
      },
      {
        Header: "Description",
        accessor: "description",
      },

      {
        Header: "Total No. of Beds",
        accessor: "total_beds",
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openWard(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteWard(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: wards,
  });

  return (
      <><nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Wards
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/hospital/wards"} className="nav-link">
              Wards
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/hospital/add_wards"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
    <br></br>
    <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by ward_name"
              value={searchWardName} />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12 list">
          <table
            className="table table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="col-md-8">
          <button className="btn btn-sm btn-danger" onClick={removeAllWards}>
            Remove All
          </button>
        </div>
      </div></>
  );
};

export default WardsList*/


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
import { DeleteOutline, AddCircleOutline, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
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

const rows = [
  createData(1, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
  createData(2, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
  createData(3, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
  createData(4, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
  createData(5, 'Royal Hospital','012-345-6789','Colombo','Colombo','Western'),
  
];

export default function Hospitals() {
  const [data, setData] = useState(rows)
  const classes = useStyles();

  const handleDelete = (hospital_id)=>{
    setData(data.filter((item)=>item.hospital_id !== hospital_id));
  };

  return (
    <TableContainer component={Paper}>
      <Link to="/healthMinistry/addHospital"><button className="wardAddButton"><AddCircleOutline/>Add New Hospital</button></Link>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Contact</TableCell>
            <TableCell align="left">District</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">Province</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.hospital_id}>
              <TableCell component="th" scope="row">
                {row.hospital_id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.contact}</TableCell>
              <TableCell align="left">{row.city}</TableCell>
              <TableCell align="left">{row.district}</TableCell>
              <TableCell align="left">{row.province}</TableCell>

              <>
              <TableCell align="left">
                <Link to={"/wards/"+row.hospital_id}>
                <button className="wardListEdit" aria-label="edit" >
                  <Edit/>Edit 
                </button></Link><DeleteOutline className="wardListDelete" onclick={()=>handleDelete(data.hospital_id)}/>
              </TableCell></>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
