import { combineReducers} from "redux";
import patientReducer from './patients'
import pcrReducer from './pcr';

export default combineReducers({
    patients: patientReducer,
    pcr: pcrReducer
})