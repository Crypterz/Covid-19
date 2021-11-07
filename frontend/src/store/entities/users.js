import { createSlice} from '@reduxjs/toolkit'
import { apiCallBegan } from '../apiActions';
import { createSelector } from 'reselect';
import configData from '../../config.json';
import moment from 'moment';

const slice = createSlice({
    name: "users",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null,
        userAdded: false,
    },

    reducers: {
        userCreateRequested(user, action) {
            user.loading = true;
            user.userAdded = false;
        },

        userCreateRequestFailed(user, action){
            user.loading = false;
        },

        userCreateRequestSucceeded(user, action){
            user.loading = false;
            user.userAdded = true
        },
        
        userRequested(user, action){
            user.loading = true;
        },


        userRequestFailed(user, action){
            user.loading = false;
            
        },

        userReceived(users, action){
            users.list = action.payload.data.users;
            users.loading = false;
            users.lastFetch = Date.now();
        },

        userUpdated(user, action){
            
        },
    }
});

export default slice.reducer;

export const {
    userRequested,
    userRequestFailed,
    userReceived,
    userCreateRequested,
    userCreateRequestFailed,
    userCreateRequestSucceeded,
} =slice.actions;

const userURL = "/api/v1/";
const refreshTime = configData.REFRESH_TIME;

export const loadUsers = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.user;

    const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
    if (diffInMinutes < refreshTime) return;
    
    return dispatch(
        apiCallBegan({
            url: userURL + 'users',
            onStart: userRequested.type,
            onSuccess: userReceived.type,
            onError: userRequestFailed.type
        })
    );
};

export const addUser = (user) => (dispatch) => {
    console.log(user)
    return dispatch(
        apiCallBegan({
            url: userURL + 'users/signup',
            method: "post",
            data: user,
            onStart: userCreateRequested,
            onSuccess: userCreateRequestSucceeded.type,
            onError: userCreateRequestFailed
        })
    );
}

export const getUserLoadingStatus = createSelector(
    state => state.entities.userloading,
    loading => loading
);

export const getUserAddedStatus = createSelector(
    state => state.entities.user,
    userAdded => userAdded
)

export const getAllUsers = createSelector(
    state => state.entities.user,
    user => user.list
);