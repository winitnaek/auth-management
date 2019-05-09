import * as types from '../../base/constants/ActionTypes'
import ssoConfigAPI from './ssoConfigAPI';
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
/**
 * adminAction
 * @author Vinit
 */
export function getSSOConfigsByTenant() {
    return function (dispatch, getState) {
        const state = getState();
        let data = [
            {'accountId':'100', 'accountName':'IBM', 'configId':'conf1','configName':'Config IBM'},
            {'accountId':'101', 'accountName':'Panera', 'configId':'conf2','configName':'Config Pan'},
            {'accountId':'103', 'accountName':'Walmart', 'configId':'conf3','configName':'Config Wal'},
            {'accountId':'104', 'accountName':'HBO', 'configId':'conf4','configName':'Config HBO'},
            {'accountId':'105', 'accountName':'BSI', 'configId':'conf5','configName':'Config BSI'},
            {'accountId':'106', 'accountName':'TestComp', 'configId':'conf6','configName':'Config Com'},
            {'accountId':'107', 'accountName':'Microsoft', 'configId':'conf7','configName':'Config Msft'}];
        let ssoconfigsdata = {
            ssoconfigs:data
        }
        return new Promise((resolve, reject) => { 
            dispatch(getSSOConfigsByTenantSuccess(ssoconfigsdata));  
        setTimeout(() => resolve(ssoconfigsdata), 100); 
        }); 
        /*return ssoConfigAPI.getSSOConfigsByTenant().then(ssoconfigsdata => {
            if(ssoconfigsdata){
                if(ssoconfigsdata && ssoconfigsdata.syncdate){
                    dispatch(getSSOConfigsByTenantSuccess(ssoconfigsdata));
                }else if(ssoconfigsdata && ssoconfigsdata.message){
                    dispatch(getSSOConfigsByTenantError(ssoconfigsdata));
                }
            }else{
                throw ssoconfigsdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });*/
    };
}
export function getSSOConfigsByTenantSuccess(ssoconfigsdata) {
    return { type: types.GET_SSOCONFIG_BYTENANTS_SUCCESS, ssoconfigsdata };
}
export function getSSOConfigsByTenantError(ssoconfigsdata) {
    return { type: types.GET_SSOCONFIG_BYTENANTS_ERROR, ssoconfigsdata };
}
export function addSSOConfig() {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.addSSOConfig().then(ssoconfigdata => {
            if(ssoconfigdata){
                if(ssoconfigdata && ssoconfigdata.syncdate){
                    dispatch(addSSOConfigSuccess(ssoconfigdata));
                }else if(ssoconfigdata && ssoconfigdata.message){
                    dispatch(addSSOConfigError(ssoconfigdata));
                }
            }else{
                throw ssoconfigdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function addSSOConfigSuccess(ssoconfigdata) {
    return { type: types.ADD_SSO_CONFIG_SUCCESS, ssoconfigdata };
}
export function addSSOConfigError(ssoconfigdata) {
    return { type: types.ADD_SSO_CONFIG_ERROR, ssoconfigdata };
}
export function updateSSOConfig() {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.updateSSOConfig().then(ssoconfigdata => {
            if(ssoconfigdata){
                if(ssoconfigdata && ssoconfigdata.syncdate){
                    dispatch(updateSSOConfigSuccess(ssoconfigdata));
                }else if(ssoconfigdata && ssoconfigdata.message){
                    dispatch(updateSSOConfigError(ssoconfigdata));
                }
            }else{
                throw ssoconfigdata;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function updateSSOConfigSuccess(ssoconfigdata) {
    return { type: types.UPDATE_SSO_CONFIG_SUCCESS, ssoconfigdata };
}
export function updateSSOConfigError(ssoconfigdata) {
    return { type: types.UPDATE_SSO_CONFIG_ERROR, ssoconfigdata };
}
export function deleteSSOConfig(id) {
    return function (dispatch, getState) {
        const state = getState();
        return ssoConfigAPI.deleteSSOConfig().then(deleted => {
            if(deleted){
                if(deleted && deleted.message){
                    dispatch(deleteSSOConfigError(deleted));
                }else if(deleted){
                    dispatch(deleteSSOConfigSuccess(deleted));
                }
            }else{
                throw deleted;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function deleteSSOConfigSuccess(deleted) {
    return { type: types.DELETE_SSO_CONFIG_SUCCESS, deleted };
}
export function deleteSSOConfigError(deleted) {
    return { type: types.DELETE_SSO_CONFIG_ERROR, deleted };
}