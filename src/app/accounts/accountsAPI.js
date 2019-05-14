import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import AppError from '../../base/utils/AppError';
import { ADMIN_ERROR_MSG } from '../../base/utils/AppErrorEvent';
/**
 * accountsAPI
 * @author Vinit
 */
class accountsAPI {
    static linkSSOConfigToTenant(accountName, ssoConfigId, toUnlink) {
        let paramurl = `${'?accountName='}${accountName}${'&ssoConfigId='}${ssoConfigId}${'&toUnlink='}${toUnlink}`;
        var svcs_url = `${svcs.LINK_SSOCONFIG_TO_TENANT}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Link SSOConfig to Tenant. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static testSSOConfiguration(accountName, ssoConfigId) {
        let paramurl = `${'?accountName='}${accountName}${'&ssoConfigId='}${ssoConfigId}`;
        var svcs_url = `${svcs.TEST_SSO_CONFIGURATION}${paramurl}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Test SSO Configuration. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static getSSOConfigs() {
        var svcs_url = `${svcs.GET_SSOCONFIGS}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Get SSO Configurations. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
}
export default accountsAPI;