const svcpath = '/sws/';
const apiversion = 'v1';
const apir = 'r/';
const w2admws = '/SecurityService';
const apiprefix ='/api'
const webapi ='webapi/'
class urlUtils {
  static buildURL(urlin) {
    let url = `${svcpath}${apir}${webapi}${apiversion}${w2admws}${urlin}`; return url;
  }
  static buildHelpURL(urlin) {
    let url = `${svcpath}${apir}${'a/'}${urlin}`; return url;
  }
}
export default urlUtils;