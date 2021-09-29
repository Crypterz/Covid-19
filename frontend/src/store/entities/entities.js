import { combineReducers} from "redux";
import patientReducer from './patients'
import pcrReducer from './pcr';
import hospitalReducer from './hospitals'

export default combineReducers({
    patients: patientReducer,
    pcr: pcrReducer,
    hospital: hospitalReducer,
    user: userReducer,
})
