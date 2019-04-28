import * as types from '../../base/constants/ActionTypes'
import {generateAppErrorEvent} from '../../base/utils/AppErrorEvent';
import accountsAPI from './accountsAPI';
/**
 * adminAction
 * @author Vinit
 */
export function linkSSOConfigToTenant() {
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