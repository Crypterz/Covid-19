import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "hospitals",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
        hospitalAdded: false,
        wardAdded: false
    },

    reducers: {
        hospitalCreateRequested(hospital, action) {
            hospital.loading = true;
            hospital.hospitalAdded = false;
        },

        hospitalCreateRequestFailed(hospital, action){
            hospital.loading = false;
        },

        hospitalCreateRequestSucceeded(hospital, action){
            hospital.loading = false;
            hospital.hospitalAdded = true
        },

        wardCreateRequested(hospital, action) {
            hospital.loading = true;
            hospital.wardAdded = false;
        },

        wardCreateRequestFailed(hospital, action){
            hospital.loading = false;
        },

        wardCreateRequestSucceeded(hospital, action){
            hospital.loading = false;
            hospital.wardAdded = true
        },

        
        hospitalRequested(hospital, action){
            hospital.loading = true;
        },


        hospitalRequestFailed(hospital, action){
            hospital.loading = false;
            
        },

        hospitalReceived(hospitals, action){
            //pcr.list = action.payload.pcr;
            hospitals.list = action.payload.data.hospitals;
            hospitals.loading = false;
            hospitals.lastFetch = Date.now();
            //console.log(hospitals.list)
        },

        hospitalUpdated(hospital, action){
            
        },

        wardUpdated(hospitals, action){
            const wardId = action.payload.data.hospitals.wards;
            const index = hospitals.list.wards.findIndex(c => c._id === wardId );
            hospitals.list.wards[index] = action.payload.data.hospital;
        }
    }
});

export default slice.reducer;

export const {
    hospitalRequested,
    hospitalRequestFailed,
    hospitalReceived,
    hospitalCreateRequested,
    hospitalCreateRequestFailed,
    hospitalCreateRequestSucceeded,
    wardUpdated,
    wardCreateRequested,
    wardCreateRequestFailed,
    wardCreateRequestSucceeded,
} =slice.actions;

const hospitalURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadHospitals = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.hospital;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: hospitalURL + 'hospital',
            onStart: hospitalRequested.type,
            onSuccess: hospitalReceived.type,
            onError: hospitalRequestFailed.type
        })
    );
};

export const addHospital = (hospital) => (dispatch) => {
    console.log(hospital)
    return dispatch(
        apiCallBegan({
            url: hospitalURL + 'hospital',
            method: "post",
            data: hospital,
            onStart: hospitalCreateRequested,
            onSuccess: hospitalCreateRequestSucceeded.type,
            onError: hospitalCreateRequestFailed
        })
    );
}

export const getHospitalLoadingStatus = createSelector(
    state => state.entities.hospitalloading,
    loading => loading
);

export const getHospitalAddedStatus = createSelector(
    state => state.entities.hospital,
   // pcr => pcr.pcrAdded
    hospitalAdded => hospitalAdded
)

export const getAllHospitals = createSelector(
    state => state.entities.hospital,
    hospital => hospital.list
);

export const addWard = (ward, hospitalId) => (dispatch) => {
   // console.log(hospital)
    return dispatch(
        apiCallBegan({
            url: hospitalURL + `hospital/wards/${hospitalId}`,
            method: "post",
            data: ward,
            onStart: wardCreateRequested,
            onSuccess: wardCreateRequestSucceeded.type,
            onError: wardCreateRequestFailed
        })
    );
}

export const updateWard= (ward, id) => (dispatch) => {
    console.log(ward, id)
    return dispatch(
      // console.log(patient);
        apiCallBegan({
            url: hospitalURL + `wards/${id}`,
            method: "patch",
            data: ward,
            onSuccess: wardUpdated.type,
        })
    );

}

// export const updatePcrAproval = (pcrIds) =>{
//     return apiCallBegan({
//         url: pcrURL + "pcr/confirm",
//         method: "post",
//         data: pcrIds,
//         onSuccess: pcrAprovalUpdated.type,
//     });
// }

