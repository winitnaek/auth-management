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
export function getHelp(helpurl) {
    return function (dispatch, getState) {
        const state = getState();
        return accountsAPI.getHelp(helpurl).then(helpcontent => {
            if(helpcontent && helpcontent.message){
                dispatch(getHelpError(helpcontent));
            }else if(helpcontent){
                dispatch(getHelpSuccess(ssoconfigs));
            }
        }).catch(error => {
            generateAppErrorEvent(error.type,error.status,error.message,error);
        });
    };
}
export function getHelpSuccess(helpcontent) {
    return { type: types.GET_HELP_SUCCESS, helpcontent };
}
export function getHelpError(helpcontent) {
    return { type: types.GET_HELP_ERROR, helpcontent };
}