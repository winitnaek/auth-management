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
        let data = [
            {'dateTime':'4/25/2019 01:33:23','serverHost':'localhost','user':'admin','clientHost':'10.14.10.10','operation':'Added Admin Dataset','accountId':'100', 'accountName':'IBM', 'productName':'TPF','dataset':'Dataset IBM', 'entity':'Tenant', 'message':'Success'},
            {'dateTime':'4/25/2019 12:40:23','serverHost':'ssdev01','user':'root','clientHost':'10.14.10.14','operation':'Login Requested','accountId':'101', 'accountName':'Panera', 'productName':'TF','dataset':'Dataset Pan','entity':'AdminMetadata', 'message':'Success'},
            {'dateTime':'4/26/2019 11:35:23','serverHost':'123.10.171.71','user':'admin','clientHost':'15.14.10.10','operation':'Re-Ran Full Sync','accountId':'102', 'accountName':'Dannys', 'productName':'CF','dataset':'Dataset Dan', 'entity':'AdminMetadata', 'message':'Done'},
            {'dateTime':'4/27/2019 10:35:23','serverHost':'123.10.171.71','user':'admin','clientHost':'15.14.10.10','operation':'Re-Ran Full Sync','accountId':'102', 'accountName':'Dannys', 'productName':'CF','dataset':'Dataset Dan', 'entity':'AdminMetadata', 'message':'Done'},
            {'dateTime':'4/28/2019 09:35:23','serverHost':'123.10.171.71','user':'admin','clientHost':'15.14.10.10','operation':'Re-Ran Full Sync','accountId':'102', 'accountName':'Dannys', 'productName':'CF','dataset':'Dataset Dan', 'entity':'AdminMetadata', 'message':'Done'},
            {'dateTime':'4/29/2019 08:35:23','serverHost':'123.10.171.71','user':'admin','clientHost':'15.14.10.10','operation':'Re-Ran Full Sync','accountId':'102', 'accountName':'Dannys', 'productName':'CF','dataset':'Dataset Dan', 'entity':'AdminMetadata', 'message':'Done'},
            {'dateTime':'4/30/2019 07:35:23','serverHost':'123.10.171.71','user':'admin','clientHost':'15.14.10.10','operation':'Re-Ran Full Sync','accountId':'102', 'accountName':'Dannys', 'productName':'CF','dataset':'Dataset Dan', 'entity':'AdminMetadata', 'message':'Done'}];
        let auditlogsdata = {
            auditlogs:data
        }
        return new Promise((resolve, reject) => { 
        dispatch(getAuditLogsSuccess(auditlogsdata));  
        setTimeout(() => resolve(auditlogsdata), 100); 
        }); 
        /*return auditLogsAPI.getAuditLogs(lastNoDays).then(auditlogs => {
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
        });*/
    };
}
export function getAuditLogsSuccess(auditlogsdata) {
    return { type: types.GET_AUDITLOGS_SUCCESS, auditlogsdata };
}
export function getAuditLogsError(auditlogsdata) {
    return { type: types.GET_AUDITLOGS_ERROR, auditlogsdata };
}