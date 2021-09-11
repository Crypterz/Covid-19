import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import WardDataService from "../../../services/WardService";
import { Link} from 'react-router-dom'

const AddWard = () => {
  const initialWardState = {
    id: null,
    ward_name: "",
    description: "",
    total_beds: "",
  };
  const [ward, setWard] = useState(initialWardState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setWard({ ...ward, [name]: value });
  };
  
  const saveWard = () => {
    var data = {
      ward_name: ward.ward_name,
      description: ward.description,
      total_beds: ward.total_beds
    };

    WardDataService.create(data)
      .then(response => {
        setWard({
          id: response.data.id,
          ward_name: response.data.ward_name,
          description: response.data.description,
          total_beds: response.data.total_beds,
        });
        setSubmitted(true);
        alert('Added: ' + this.state);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newWard = () => {
    setWard(initialWardState);
    setSubmitted(false);
  };

return (
  <><div>
  <nav className="navbar navbar-expand navbar-dark bg-dark">
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
          Add new Ward
        </Link>
      </li>
    </div>
  </nav></div>
<br></br>
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You added successfully!</h4>
          <button className="btn btn-success" onClick={newWard}>
            Add
          </button>
        </div>
      ) : (
        <div className="add-form">
          <div class="container-sm border">
          <div class="row max-height justify-content-center align-items-center">
            <div class="col-10 mx-auto banner text-center">
                        <h3 class="text-capitalize">
                            <strong class="banner-title">Add New Ward?</strong></h3>
                            <div class="card-body register-card-body"></div>
            <form class="px-4 py-3"> 
          <div class="col-xs-4">
            <label class="float-left" htmlFor="title">Ward Name:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={ward.ward_name}
              onChange={handleInputChange}
              name="ward_name"
            />
          </div>

          <div className="form-group">
            <label class="float-left" htmlFor="description">Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={ward.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label class="float-left" htmlFor="description">Total no of Beds:</label>
            <input
              type="number"
              className="form-control"
              id="total_beds"
              required
              value={ward.total_beds}
              onChange={handleInputChange}
              name="total_beds"
            />
          </div>

          <button  onClick={saveWard} className="btn btn-success">
            Add
          </button>
          </form></div></div></div>

        </div>
      )}
    </div></>
  );
};

export default AddWard;