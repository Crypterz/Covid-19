import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './apiActions';
//Auth Slice

const slice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        token: '',
        logging: false,
        loggedIn : false,
        wardAdded: false,
        wardUpdated:false
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
            console.log(user.data)
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
        },

        wardCreateRequested(auth, action) {
            // hospital.loading = true;
             auth.wardAdded = false;
        },

        wardCreateRequestFailed(auth, action){
           // hospital.loading = false;
        },

        wardCreateRequestSucceeded(auth, action){
            auth.wardAdded = true
            auth.data.user.admin.hospital.wards.push(action.payload.data.ward) //= wardId.hospital
        },

        wardUpdated(auth, action){
          //  auth.wardUpdated = true
            console.log(action.payload.data.hospital)
            // const updatedWard = action.payload.data.ward;
            // const index =  auth.data.user.admin.hospital.wards.find(p => p.name === updatedWard.name)
            // auth.data.user.admin.hospital.wards[index].totalBeds = updatedWard.totalBeds
           
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
    authDataUpdated,
    wardUpdated,
    // wardDelete,
    wardCreateRequested,
    wardCreateRequestFailed,
    wardCreateRequestSucceeded,
    } = slice.actions;

const hospitalURL = "/api/v1/hospital";


//Action Invokers
export const login = (data) => (dispatch) => {
    const url = '/api/v1/users/login';
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
    auth => auth
);


export const getLoggedInStatus = createSelector(
    state => state.auth,
  //  loggedIn => loggedIn
    auth => auth.loggedIn
);

export const updateAuthData = (data) => authDataUpdated(data);

export const addWard = (ward) => (dispatch) => {
    console.log(ward)
    return dispatch(
        apiCallBegan({
            url: hospitalURL + `/ward`,
            method: "post",
            data: ward,
            onStart: wardCreateRequested,
            onSuccess: wardCreateRequestSucceeded.type,
            onError: wardCreateRequestFailed
        })
    );
}

export const updateWard= (ward, wardId) => (dispatch) => {
    console.log(ward)
    return dispatch(
        apiCallBegan({
            url: hospitalURL + `/ward/${wardId}`,
            method: "patch",
            data: ward,
            onSuccess: wardUpdated.type,
        })
    );

}

// export const deleteWard= (ward, id) => (dispatch) => {
//     console.log(ward, id)
//     return dispatch(
//         apiCallBegan({
//             url: hospitalURL + `wards/${id}`,
//             method: "patch",
//             data: ward,
//             onSuccess: wardDelete.type,
//         })
//     );
// }

