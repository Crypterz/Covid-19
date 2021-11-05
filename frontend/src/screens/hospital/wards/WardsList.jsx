import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { getAllHospitals, getHospitalLoadingStatus, loadHospitals/*, updateWard,addWard*/, deleteWard} from '../../../store/entities/hospitals';
import { updateWard, addWard } from "../../../store/auth";
import { useDispatch, useSelector } from 'react-redux';

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
//import { update } from "../../../../../backend/models/userModel";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;


// let wards = [
//   {
//     ward_id: "1",
//     ward_no: 1,
//   .name: "Ward 1",
//     description: "Labour Ward 1",
//     totalBeds: "45"
//   },
//   {
//     ward_id: "2",
//     ward_no: 2,
//   .name: "Ward 2",
//     description: "Labour Ward 2",
//     totalBeds: "19"
//   },
//   {
//     ward_id: "3",
//     ward_no: 3,
//   .name: "Ward 3",
//     description: "Pediatric Ward 1",
//     totalBeds: "45"
//   },
//   {
//     ward_no: 4,
//   .name: "Ward 4",
//     description: "Pediatric Ward 2",
//     totalBeds: "34"
//   }
// ];

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


// let count = wards.length;
// console.log(count)
// const service = {
//   fetchItems: payload => {
//     const { activePage, itemsPerPage } = payload.pagination;
//     const start = (activePage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     let result = Array.from(wards);
//     // result = result.sort(getSorter(payload.sort));
//     return Promise.resolve(result.slice(start, end));
//   },
//   fetchTotal: payload => {
//     return Promise.resolve(wards.length);
//   },
//   create: ward => {
//     count += 1;
//     wards.push({
//       ...ward,
//       ward_no: count
//     });
//     return Promise.resolve(ward);
//   },
//   update: data => {
//     const ward = wards.find(t => t.ward_no === data.ward_no);
//     ward.name = data.name;
//     ward.description = data.description;
//     ward.totalBeds = data.totalBeds;
//   //  updateData(ward)
//     return Promise.resolve(ward);
//   },
//   delete: data => {
//     const ward = wards.find(t => t.ward_no === data.ward_no);
//     wards = wards.filter(t => t.ward_no !== ward.ward_no);
//     return Promise.resolve(ward);
//   }
// };

// const styles = {
//   container: { margin: "auto", width: "max-content" }
// };

export default function WardsList() {

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.auth);
  //console.log(userDetails)
  const { admin, user } = userDetails.data.user
  const { wards } = admin.hospital
  const auth = user

 // const [status, setStatus] = useState(false)


console.log(wards)

let count = wards.length;
console.log(count)
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


  // create: ward => {
  //   count += 1;
  //   wards.push({
  //     ...ward,
  //     ward_no: count
  //   });
  //   return Promise.resolve(ward);
  // },
  // update: data => {
  //   const ward = wards.find(t => t._id === data._d);
  //   ward.name = data.name;
  //  // ward.description = data.description;
  //   ward.totalBeds = data.totalBeds;
  // //  updateData(ward)
  //   return Promise.resolve(ward);
  // },
  // delete: data => {
  //   const ward = wards.find(t => t.ward_no === data.ward_no);
  //   wards = wards.filter(t => t.ward_no !== ward.ward_no);
  //   return Promise.resolve(ward);
  // }
};

const styles = {
  container: { margin: "auto", width: "max-content" }
};
 // const hospitalsLoading = useSelector(getHospitalLoadingStatus);

 function updateCurrentWard(ward){
   // console.log(ward)
    const wardDetails = {
       //wardNo: ward.ward_no,
       name: ward.name,
       totalBeds: ward.totalBeds,
      // admittedPatients: ward.admitted_patients,
      //description: ward.description
    }

    // count += 1;
    // wards.push({
    //   ...ward,
    //   ward_no: count
    // });

    dispatch(updateWard(wardDetails, ward._id))
    //update(ward)
    return Promise.resolve(ward)
 }

 function addNewWard(ward){
  // console.log(ward)
   const wardDetails = {
      //wardNo: ward.ward_no,
      name: ward.name,
      totalBeds: ward.totalBeds,
     // admittedPatients: ward.admitted_patients,
     //description: ward.description
   }
   dispatch(addWard(wardDetails))
   return Promise.resolve(ward)
}

function deleteCurrentWard(ward){
  // console.log(ward)
   const wardDetails = {
      //wardNo: ward.ward_no,
      name: ward.name,
      totalBeds: ward.totalBeds,
     // admittedPatients: ward.admitted_patients,
     //description: ward.description
   }
   dispatch(deleteWard(wardDetails, ward.ward_id))
   //setStatus(true)
   //window.location.reload()
   return Promise.resolve(ward)
}

 useEffect (() => {

  // dispatch(loadHospitals())
 },[userDetails])


return (
  <div style={styles.container}>
    <CRUDTable
      caption="WARDS"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        {/* <Field name="ward_no" label="WARD NO" hideInCreateForm /> */}
        <Field name="name" label="WARD NAME" placeholder="Enter Ward Name" />5
        <Field name="totalBeds" type="number" label="TOTAL BEDS" placeholder="Enter Total number of Beds" />
      </Fields>

      
      <CreateForm
        Ward Name="Ward Creation"
        message="Create a new ward!"
        trigger="ADD NEW WARDS"
        onSubmit={ward => addNewWard(ward)}
        submitText="CREATE"
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Please, provide ward's Ward Name";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="Ward Update Process"
        message="Update ward"
        trigger="UPDATE"
       // onSubmit={ward => service.update(ward)}
        onSubmit = { ward => updateCurrentWard(ward)}
        submitText="Update"
        validate={values => {
          const errors = {};

          // if (!values.ward_no) {
          //   errors.ward_no = "Please, provide Ward Number";
          // }

          if (!values.name) {
            errors.name = "Please, provide ward's Ward Name";
          }


          return errors;
        }}
      />

      <DeleteForm
        title="Ward Delete Process"
        message="Are you sure you want to delete the Ward?"
        trigger="DELETE"
        onSubmit={ward => deleteCurrentWard(ward)}
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
