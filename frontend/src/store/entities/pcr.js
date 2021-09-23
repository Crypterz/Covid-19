import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "pcr",
    initialState: {
        list: [],
        loading: false,
        pcrAdded: false,
        lastFetch: null
    },

    reducers: {
        pcrCreateRequested(pcr, action) {
            pcr.loading = true;
            pcr.pcrAdded = false;
        },

        pcrCreateRequestFailed(pcr, action){
            pcr.loading = false;
        },

        pcrCreateRequestSucceeded(pcr, action){
            pcr.loading = false;
            pcr.pcrAdded = true
        },

        
        pcrRequested(pcr, action){
            pcr.loading = true;
        },


        pcrRequestFailed(pcr, action){
            pcr.loading = false;
            
        },

        pcrReceived(pcr, action){
            //pcr.list = action.payload.pcr;
            pcr.list = action.payload.data.pcr;
            pcr.loading = false;
            pcr.lastFetch = Date.now();
            console.log(pcr.list)
        },

        pcrAprovalUpdated(pcr, action){
            // const {pcrId} = action.payload.data;
            // console.log(action.payload);
            // const index = pcr.list.findIndex
        }
    }
});

export default slice.reducer;

export const {
    pcrRequested,
    pcrRequestFailed,
    pcrReceived,
    pcrCreateRequested,
    pcrCreateRequestFailed,
    pcrCreateRequestSucceeded,
    pcrAprovalUpdated
} =slice.actions;

const pcrURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadPcrs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.pcr;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: pcrURL + 'pcr',
            onStart: pcrRequested.type,
            onSuccess: pcrReceived.type,
            onError: pcrRequestFailed.type
        })
    );
};

export const addPcr = (pcr) => (dispatch) => {
    console.log(pcr)
    return dispatch(
        //console.log(pcr)
        apiCallBegan({
            url: pcrURL + 'pcr',
            method: "post",
            data: pcr,
            onStart: pcrCreateRequested,
            onSuccess: pcrCreateRequestSucceeded.type,
            onError: pcrCreateRequestFailed
        })
    );
}

export const getPcrLoadingStatus = createSelector(
    state => state.entities.pcr.loading,
    loading => loading
);

export const getPcrAddedStatus = createSelector(
    state => state.entities.pcr,
   // pcr => pcr.pcrAdded
    pcrAdded => pcrAdded
)

export const getAllPcrs = createSelector(
    state => state.entities.pcr,
    pcr => pcr
);

export const updatePcrAproval = (pcrIds) =>{
    return apiCallBegan({
        url: pcrURL + "pcr/confirm",
        method: "put",
        data: pcrIds,
        onSuccess: pcrAprovalUpdated.type,
    });
}

