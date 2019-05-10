import {combineReducers} from 'redux';
import adminReducer from '../../app/admin/adminReducer';
import accountsReducer from '../../app/accounts/accountsReducer';
import linkReducer from '../../app/accounts/linkReducer';
import unlinkReducer from '../../app/accounts/unlinkReducer';
import auditLogsReducer from '../../app/auditlogs/auditLogsReducer';
import ssoConfigsReducer from '../../app/ssoconfigs/ssoConfigsReducer';
import modifyConfigReducer from '../../app/ssoconfigs/modifyConfigReducer';
import testssoidpReducer from '../../app/ssoconfigs/testssoidpReducer';

const rootReducer = combineReducers({ 
    admindata: adminReducer, 
    accountsdata: accountsReducer, 
    linkdata: linkReducer, 
    unlinkdata: unlinkReducer,
    auditlogsdata:auditLogsReducer,
    ssoconfigsdata:ssoConfigsReducer,
    modifydata:modifyConfigReducer,
    ssoidpdata:testssoidpReducer
});
export default rootReducer;