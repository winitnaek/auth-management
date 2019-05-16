import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import AppError from '../../base/utils/AppError';
import { ADMIN_ERROR_MSG } from '../../base/utils/AppErrorEvent';
/**
 * ssoConfigAPI
 * @author Vinit
 */
class ssoConfigAPI {
    static addSSOConfig(SSOproperties) {
        let tt = JSON.stringify(SSOproperties);
        var svcs_url = `${svcs.ADD_SSO_CONFIG}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            body: tt,
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Add SSO Config. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static updateSSOConfig(SSOproperties) {
        let tt = JSON.stringify(SSOproperties);
        var svcs_url = `${svcs.UPDATE_SSO_CONFIG}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            method: 'POST',
            body: tt,
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Update SSO Config. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static deleteSSOConfig(id) {
        let paramurl = `${'?id='}${id}`;
        var svcs_url = `${svcs.DELETE_SSO_CONFIG}${paramurl}`;
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
                var errorMsg = 'Unable to Delete SSO Config. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
}
export default ssoConfigAPI;