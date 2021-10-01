import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './apiActions';
import Cookies from 'js-cookie';
//Auth Slice

const slice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        token: '',
        logging: false,
        loggedIn : false
    },
    reducers: {

        userLoginRequested(user, action){
            user.logging = true;
        },

        userLoginFailed(user, action) {
            user.logging = false;
            user.error = action.payload;
        },

        userLoginSucceeded(user, action){
            user.logging = false;
            delete user.error;
            user.data = action.payload.data;
            user.token = action.payload.token; 
            //Cookies.set("token", user.token) 
            user.loggedIn = true;
        },

        // userLoginRequested(user, action){
        //     auth.logging = true;
        // },

        // userLoginFailed(user, action) {
        //     auth.logging = false;
        //     auth.error = action.payload;
        // },

        // userLoginSucceeded(auth, action){
        //     auth.logging = false;
        //     delete auth.error;
        //    // auth.data = action.payload.data;
        //     auth.token = action.payload.data.auth.token;  
        //     auth.loggedIn = true;
        //     console.log(auth.loggedIn);
        // },




        userLoggedOut(user,action){
            user.loggedIn = false;
            user.data = {};
            user.token=''
        },

        authDataUpdated(user, action){
            user.data = {...user.data, ...action.payload};
        }
    }
});


//Reducer
export default slice.reducer;


//Action Creators
export const { 
    userLoginRequested, 
    userLoginFailed, 
    userLoginSucceeded, 
    userLoggedOut,
    authDataUpdated
    } = slice.actions;


//Action Invokers
export const login = (data) => (dispatch) => {
    const url = '/api/v1/users/login';
    console.log(data);
    return dispatch(
        apiCallBegan({
            url,
            onStart: userLoginRequested.type,
            onError: userLoginFailed.type,
            onSuccess: userLoginSucceeded.type,
            method: 'post',
            data : data
        })
    );
};


export const logout = () => (dispatch) =>dispatch(userLoggedOut());


//Selectors

export const getAuthDetails = createSelector(
    state => state.auth.data,
    userData => userData
);

export const getAllAuthDetails = createSelector(
    state => state.auth,
    userData => userData
);


export const getLoggedInStatus = createSelector(
    state => state.auth,
  //  loggedIn => loggedIn
    auth => auth.loggedIn
);

export const updateAuthData = (data) => authDataUpdated(data);

