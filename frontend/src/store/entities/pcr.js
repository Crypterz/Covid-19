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
        },

        
        pcrRequested(pcr, action){
            pcr.loading = true;
        },


        pcrRequestFailed(pcr, action){
            pcr.loading = false;
            
        },

        pcrReceived(pcr, action){
            console.log(action.payload.data)
            pcr.list = action.payload.data.tests;
            pcr.loading = false;
            pcr.lastFetch = Date.now();
        },

        pcrStatusChange(pcr, action){
           // const pcrTest = pcr.list.filter(p => p._id === action.payload.data.test._id)
            // const pcrTest = pcr.list.map(p => {
            //     if(p._id === action.payload.data.test._id){
            //         p =  action.payload.data.test
            //     }
            // })

            const index = pcr.list.findIndex(p => p._id === action.payload.data.test._id);
            pcr.list[index] =  action.payload.data.test
            //const pcrTest = pcr.list[index].status;
            //pcrTest.status =  action.payload.data.test.result

          //  console.log(pcrTest)
            console.log(action.payload.data.test._id)
        },

        
        // allPcrRequested(pcr, action){
        //     pcr.loading = true;
        // },


        // allPcrRequestFailed(pcr, action){
        //     pcr.loading = false;
            
        // },

        // allPcrReceived(pcr, action){
        //     pcr.list = action.payload.data.tests;
        //     pcr.loading = false;
        //     pcr.lastFetch = Date.now();
        // },

        pcrAprovalUpdated(pcr, action){
              const ids = action.payload.data.ids
              const list = pcr.list.filter( p=> !p._id.includes(ids));
              pcr.list = list;
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
    pcrAprovalUpdated,
    pcrStatusChange,
    // allPcrRequested,
    // allPcrReceived,
    // allPcrRequestFailed,
} =slice.actions;

const pcrURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadPcrs = () => (dispatch, getState) => {
   const { lastFetch } = getState().entities.pcr;
   const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
   if (diffInMinutes < refreshTime) return;
     
    return dispatch(
        apiCallBegan({
          //  url: pcrURL + 'pcr/toconfirm',
            url: pcrURL + 'pcr/',
            method: "get",
            onStart: pcrRequested.type,
            onSuccess: pcrReceived.type,
            onError: pcrRequestFailed.type,
        })
    );
};

// export const loadAllPcrs = () => (dispatch, getState) => {
//     const { lastFetch } = getState().entities.pcr;
//     const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
//     if (diffInMinutes < refreshTime) return;
      
//      return dispatch(
//          apiCallBegan({
//              url: pcrURL + 'pcr/',
//              method: "get",
//              onStart: allPcrRequested.type,
//              onSuccess: allPcrReceived.type,
//              onError: allPcrRequestFailed.type,
//          })
//      );
//  };

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

export const changeStatus = (id, status) => (dispatch) =>{
    console.log(id, status)
    return dispatch(
        apiCallBegan({
            url: pcrURL + `pcr/${id}/changestatus`,
            method: "patch",
            data: {status: status},
            onSuccess: pcrStatusChange.type,
        })
    )
}

export const updatePcrAproval = (ids) => (dispatch) =>{
    console.log(ids)
    return dispatch(
        apiCallBegan({
            url: pcrURL + "pcr/confirm",
            method: "post",
            data: ids,
            onSuccess: pcrAprovalUpdated.type,
        })
    )
}

