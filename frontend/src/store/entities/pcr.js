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
            pcr.pcrAdded = false
        },

        pcrCreateRequestSucceeded(pcr, action){
            pcr.loading = false;
            pcr.pcrAdded = true
           // console.log(pcr.pcrAdded)
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
            //console.log(pcr.list)
        },

        pcrAprovalUpdated(pcr, action){
            //  const ids = action.payload.data.ids
            //  console.log(action.payload.data)
            //  let lists = []
            //  pcr.list.map( p=> {
            //     if (ids.includes(p._id)){
            //         console.log(p)
            //         lists.push(p)
            //     }
            //  });
            // //  const {pcrId} = action.payload.data;
            //   console.log(lists);
            //  const index = pcr.list.findIndex
            //console.log(action.payload.data)
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
  //  console.log(data)
    const { lastFetch } = getState().entities.pcr;
    //console.log(token)
   const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
   if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: pcrURL + 'pcr',
            method: "get",
           // data: data,
            onStart: pcrRequested.type,
            onSuccess: pcrReceived.type,
            onError: pcrRequestFailed.type,
        })
    );
};

export const addPcr = (pcr) => (dispatch) => {
    console.log(pcr)
    return dispatch(
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
    pcr => pcr.pcrAdded
)

export const getAllPcrs = createSelector(
    state => state.entities.pcr,
    pcr => pcr.list
);

export const updatePcrAproval = (ids)=> (dispatch) =>{
    console.log(ids)
    return apiCallBegan({
        url: pcrURL + "pcr/confirm",
        method: "post",
        data: ids,
        //header: token,
        onSuccess: pcrAprovalUpdated.type,
    });
}

