const svcpath = '/sws/';
const apiversion = 'v1';
const apir = 'r/';
const w2admws = '/SecurityService';
const apiprefix ='/api'
class urlUtils {
  static buildURL(urlin) {
    let url = `${apiprefix}${svcpath}${apir}${apiversion}${w2admws}${urlin}`; return url;
  }
}
export default urlUtils;