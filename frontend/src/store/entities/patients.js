import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "patients",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        patientsRequested(patients, action){
            patients.loading = true;
        },


        patientsRequestFailed(patients, action){
            patients.loading = false;
            
        },

    // payload: [message: , data: ]
        patientsReceived(patients, action){
            patients.list = action.payload.patients;
            patients.loading = false;
            patients.lastFetch = Date.now();
        },
    },
});

export default slice.reducer;


export const { 
    patientsRequested, 
    patientsReceived, 
    patientsRequestFailed, } = slice.actions;
                            

const productsURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

//Action Invokers
export const loadPatients = () => (dispatch, getState) => {
   const { lastFetch } = getState().entities.patients;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;

    return dispatch(
        apiCallBegan({
            url: productsURL + 'patients/',
            onStart: patientsRequested.type,
            onSuccess: patientsReceived.type,
            onError: patientsRequestFailed.type
        })
    );
};

export const getAllPatients= createSelector(
    state => state.entities.patients.list,
    patients => patients,
   // console.log(patients)
);

export const getPatientsLoadingStatus = createSelector(
    state => state.entities.patients.loading,
    loading => loading
);

export const getPatientById = patientId =>
    createSelector(
        state => state.entities.patients.list,
        patients => {
            const index = patients.findIndex(p => p._id === patientId);
            if(index !== -1) return patients[index];
            return {};
        },

);

