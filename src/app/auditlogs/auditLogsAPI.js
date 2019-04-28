import * as svcs from '../../base/constants/ServiceUrls';
import URLUtils from '../../base/utils/urlUtils';
import AppError from '../../base/utils/AppError';
import { ADMIN_ERROR_MSG } from '../../base/utils/AppErrorEvent';
/**
 * auditLogsAPI
 * @author Vinit
 */
class auditLogsAPI {
    static addAuditLog(AuditLogproperties) {
        let tt = JSON.stringify(AuditLogproperties);
        var svcs_url = `${svcs.ADD_AUDIT_LOG}`;
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
                var errorMsg = 'Unable to Add Audit Log. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
    static getAuditLogs(lastNoDays) {
        var svcs_url = `${svcs.GET_AUDIT_LOGS}`;
        return fetch(URLUtils.buildURL(svcs_url), {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var errorCode = response.status;
                var errorMsg = 'Unable to Get Audit Logs. ' + ADMIN_ERROR_MSG;
                return new AppError(errorMsg, errorCode);
            }
        }).catch(error => {
            return error;
        });
    }
}
export default auditLogsAPI;