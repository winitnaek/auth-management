import * as types from '../../base/constants/ActionTypes'
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
import accountsAPI from './accountsAPI';
import adminAPI from '../admin/adminAPI';
/**
 * adminAction
 * @author Vinit
 */
export function linkSSOConfigToTenant(accountName, ssoConfigId, toUnlink) {
    return function (dispatch, getState) {
        const state = getState();
        return accountsAPI.linkSSOConfigToTenant(accountName, ssoConfigId, toUnlink).then(islinked => {
            if(islinked){
                if(islinked && islinked.message){
                    dispatch(linkSSOConfigToTenantError(islinked));
                }else if(islinked){
                    dispatch(linkSSOConfigToTenantSuccess(islinked));
                }
            }else{
                throw islinked;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function linkSSOConfigToTenantSuccess(islinked) {
    return { type: types.LINK_SSOCONFIG_TO_TENANT_SUCCESS, islinked };
}
export function linkSSOConfigToTenantError(islinked) {
    return { type: types.LINK_SSOCONFIG_TO_TENANT_ERROR, islinked };
}
export function testSSOConfiguration(accountName, ssoConfigId) {
    return function (dispatch, getState) {
        const state = getState();
        return accountsAPI.testSSOConfiguration(accountName, ssoConfigId).then(issuccess=> {
            if(issuccess){
                if(issuccess && issuccess.message){
                    dispatch(testSSOConfigurationError(issuccess));
                }else if(issuccess){
                    dispatch(testSSOConfigurationSuccess(issuccess));
                }
            }else{
                throw issuccess;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function testSSOConfigurationSuccess(issuccess) {
    return { type: types.TEST_SSOCONFIG_SUCCESS, issuccess };
}
export function testSSOConfigurationError(issuccess) {
    return { type: types.TEST_SSOCONFIG_ERROR, issuccess };
}
export function loadUnLinkConfig(unlinkdata) {
    return {type:types.LOAD_UNLINKCONFIG_DATA,unlinkdata};
}
export function loadLinkConfig(linkdata){
    return {type:types.LOAD_LINKCONFIG_DATA,linkdata};
}
export function getTenantAccounts(includeImported) {
    return function (dispatch, getState) {
        const state = getState();
        /*let data = [{'id':'100', 'acctName':'IBM', 'prodName':'TPF','dataset':'Dataset IBM', 'isEnabled':true, 'configname':'IBM Staging'}
                    ,{'id':'101', 'acctName':'Panera', 'prodName':'TF','dataset':'Dataset Pan','isEnabled':true, 'configname':''},
                    {'id':'102', 'acctName':'Dannys', 'prodName':'CF','dataset':'Dataset Dan', 'isEnabled':true, 'configname':'Dannys prodconf'}];
        let accountsdata = {
            accounts:data
        }
        return new Promise((resolve, reject) => { 
        dispatch(getTenantAccountsSuccess(accountsdata));  
        setTimeout(() => resolve(accountsdata), 100); 
        }); */
        return adminAPI.getTenants(includeImported).then(tenants => {
            if(tenants){
                if(tenants && tenants.message){
                    dispatch(getTenantAccountsError(tenants));
                }else if(tenants){
                    dispatch(getTenantAccountsSuccess(tenants));
                }
            }else{
                throw tenants;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getTenantAccountsSuccess(accountsdata) {
    return { type: types.GET_TENANTS_SUCCESS, accountsdata };
}
export function getTenantAccountsError(accountsdata) {
    return { type: types.GET_TENANTS_ERROR, accountsdata };
}
export function getSSOConfigs() {
    return function (dispatch, getState) {
        const state = getState();
        return accountsAPI.getSSOConfigs().then(ssoconfigs => {
            if(islinked){
                if(ssoconfigs && ssoconfigs.message){
                    dispatch(getSSOConfigsError(ssoconfigs));
                }else if(ssoconfigs){
                    dispatch(getSSOConfigsSuccess(ssoconfigs));
                }
            }else{
                throw ssoconfigs;
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getSSOConfigsSuccess(ssoconfigs) {
    return { type: types.GET_SSOCONFIGS_SUCCESS, ssoconfigs };
}
export function getSSOConfigsError(ssoconfigs) {
    return { type: types.GET_SSOCONFIGS_ERROR, ssoconfigs };
}