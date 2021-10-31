import React from "react";
import ReactDOM from "react-dom";

import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination 
} from "react-crud-table";

// Component's Base CSS
import "./wardList.css";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let wards = [
  {
    ward_no: 1,
    ward_name: "Ward 1",
    description: "Labour Ward 1",
    total_beds: "45"
  },
  {
    ward_no: 2,
    ward_name: "Ward 2",
    description: "Labour Ward 2",
    total_beds: "19"
  },
  {
    ward_no: 3,
    ward_name: "Ward 3",
    description: "Pediatric Ward 1",
    total_beds: "45"
  },
  {
    ward_no: 4,
    ward_name: "Ward 4",
    description: "Pediatric Ward 2",
    total_beds: "34"
  }
];

// const SORTERS = {
//   NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
//   NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
//   STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
//   STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
// };

// const getSorter = data => {
//   const mapper = x => x[data.field];
//   let sorter = SORTERS.STRING_ASCENDING(mapper);

//   if (data.field === "ward_no") {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.NUMBER_ASCENDING(mapper)
//         : SORTERS.NUMBER_DESCENDING(mapper);
//   } else {
//     sorter =
//       data.direction === "ascending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   }

//   return sorter;
// };


let count = wards.length;
const service = {
  fetchItems: payload => {
    const { activePage, itemsPerPage } = payload.pagination;
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let result = Array.from(wards);
    // result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result.slice(start, end));
  },
  fetchTotal: payload => {
    return Promise.resolve(wards.length);
  },
  create: ward => {
    count += 1;
    wards.push({
      ...ward,
      ward_no: count
    });
    return Promise.resolve(ward);
  },
  update: data => {
    const ward = wards.find(t => t.ward_no === data.ward_no);
    ward.ward_name = data.ward_name;
    ward.description = data.description;
    ward.total_beds = data.total_beds;
    return Promise.resolve(ward);
  },
  delete: data => {
    const ward = wards.find(t => t.ward_no === data.ward_no);
    wards = wards.filter(t => t.ward_no !== ward.ward_no);
    return Promise.resolve(ward);
  }
};

const styles = {
  container: { margin: "auto", width: "max-content" }
};

export default function WardsList() {
return (
  <div style={styles.container}>
    <CRUDTable
      caption="WARDS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="ward_no" label="WARD NO" hideInCreateForm />
        <Field name="ward_name" label="WARD NAME" placeholder="Enter Ward Name" />5
        <Field name="total_beds" type="number" label="TOTAL BEDS" placeholder="Enter Total number of Beds" />
      </Fields>

      
      <CreateForm
        Ward Name="Ward Creation"
        message="Create a new ward!"
        trigger="ADD NEW WARDS"
        onSubmit={ward => service.create(ward)}
        submitText="CREATE"
        validate={values => {
          const errors = {};
          if (!values.ward_name) {
            errors.ward_name = "Please, provide ward's Ward Name";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="Ward Update Process"
        message="Update ward"
        trigger="UPDATE"
        onSubmit={ward => service.update(ward)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.ward_no) {
            errors.ward_no = "Please, provide Ward Number";
          }

          if (!values.ward_name) {
            errors.ward_name = "Please, provide ward's Ward Name";
          }


          return errors;
        }}
      />

      <DeleteForm
        title="Ward Delete Process"
        message="Are you sure you want to delete the Ward?"
        trigger="DELETE"
        onSubmit={ward => service.delete(ward)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.ward_no) {
            errors.ward_no = "Please, provide Ward Number";
          }
          return errors;
        }}
      />
      <Pagination
        itemsPerPage={3}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />
    </CRUDTable>
  </div>
);

      }
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
