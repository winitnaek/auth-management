import {combineReducers} from 'redux';
import adminReducer from '../../app/admin/adminReducer';
import accountsReducer from '../../app/accounts/accountsReducer';
import linkReducer from '../../app/accounts/linkReducer';
import unlinkReducer from '../../app/accounts/unlinkReducer';
const rootReducer = combineReducers({ 
    admindata: adminReducer, 
    accountsdata: accountsReducer, 
    linkdata: linkReducer, 
    unlinkdata: unlinkReducer 
});
export default rootReducer;