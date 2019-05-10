export default {
  logindata: {
    isAuthenticated:false,
    isLoggedOut:false,
    userLoggedIn:''
  },
  admindata:{
    lastFullSync:'',
    lastPerFSync:'',
    isPerSyncOn:false,
    isSyncInProgress:false,
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
  },
  modifydata:{
    modify: false,
    configid:''
  },
  ssoidpdata:{
    testssoidp: false,
    ssoid:''
  }
}