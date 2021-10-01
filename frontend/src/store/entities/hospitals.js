import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "hospital",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
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

        
        hospitalRequested(hospital, action){
            hospital.loading = true;
        },


        hospitalRequestFailed(hospital, action){
            hospital.loading = false;
            
        },

        hospitalReceived(hospital, action){
            //pcr.list = action.payload.pcr;
            hospital.list = action.payload.data.pcr;
            hospital.loading = false;
            hospital.lastFetch = Date.now();
            //console.log(pcr.list)
        },

        hospitalUpdated(hospital, action){
            
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
} =slice.actions;

const pcrURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadHospitals = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.hospital;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: pcrURL + 'hospital',
            onStart: hospitalRequested.type,
            onSuccess: hospitalReceived.type,
            onError: hospitalRequestFailed.type
        })
    );
};

export const addHospital = (hospital) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: pcrURL + 'hospital',
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
    hospital => hospital
);

// export const updatePcrAproval = (pcrIds) =>{
//     return apiCallBegan({
//         url: pcrURL + "pcr/confirm",
//         method: "post",
//         data: pcrIds,
//         onSuccess: pcrAprovalUpdated.type,
//     });
// }

