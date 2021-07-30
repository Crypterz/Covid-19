import { combineReducers} from "redux";
import patientReducer from './patients'

export default combineReducers({
    patients: patientReducer,
})