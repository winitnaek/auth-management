export default {
  logindata: {
    isAuthenticated:false,
    isLoggedOut:false,
    userLoggedIn:''
  },
  admindata:{
    lastFullSyncDt:'',
    lastSFSyncDt:'',
    lastTPFSyncDt:'',
    sfSyncEnabled:'',
    tpfSyncEnabled:'',
    adminTenants:[]
  },
  accountsdata:{
    accounts:[]
  },
  linkdata: {
    linked: false,
    accountid:''
  },
  unlinkdata: {
    unlinked: false,
    accountid:''
  },
  auditlogsdata:{
    auditlogs:[]
  },
  ssoconfigsdata:{
    ssoconfigs:[]
  }
}