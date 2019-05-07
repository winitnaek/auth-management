import {combineReducers} from 'redux';
import adminReducer from '../../app/admin/adminReducer';
const rootReducer = combineReducers({admindata:adminReducer});
export default rootReducer;