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

export default WardsList