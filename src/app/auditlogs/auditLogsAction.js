import * as types from '../../base/constants/ActionTypes'
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
import auditLogsAPI from './auditLogsAPI';
/**
 * auditLogsAction
 * @author Vinit
 */
export function addAuditLog(AuditLogproperties) {
    return function (dispatch, getState) {
        const state = getState();
        return auditLogsAPI.addAuditLog(AuditLogproperties).then(auditlogdata => {
            if(auditlogdata){
                if(auditlogdata && auditlogdata.syncdate){
                    dispatch(addAuditLogSuccess(ssoconfigdata));
                }else if(auditlogdata && auditlogdata.message){
                    dispatch(addAuditLogError(auditlogdata));
                }
            }else{
                throw auditlogdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function addAuditLogSuccess(auditlogdata) {
    return { type: types.ADD_AUDITLOG_SUCCESS, auditlogdata };
}
export function addAuditLogError(auditlogdata) {
    return { type: types.ADD_AUDITLOG_ERROR, auditlogdata };
}
export function getAuditLogs(lastNoDays) {
    return function (dispatch, getState) {
        const state = getState();
        return auditLogsAPI.getAuditLogs(lastNoDays).then(auditlogs => {
            if(auditlogs){
                if(auditlogs && auditlogs.logsdata){
                    dispatch(getAuditLogsSuccess(auditlogs));
                }else if(auditlogs && auditlogs.message){
                    dispatch(getAuditLogsError(auditlogs));
                }
            }else{
                throw auditlogs;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getAuditLogsSuccess(auditlogs) {
    return { type: types.GET_AUDITLOGS_SUCCESS, auditlogs };
}
export function getAuditLogsError(auditlogs) {
    return { type: types.GET_AUDITLOGS_ERROR, auditlogs };
}