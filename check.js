var userDataUp = sessionStorage.getItem('up');
var userdata   = JSON.parse(userDataUp);
if(!userdata){
    window.location="login.html?user=nouser";
}
const macLogin = (function () {
    function logout() {
      sessionStorage.removeItem(macLogin.appdata.userkey);
      /*fetch('/api/logout',{
        credentials: 'same-origin'
      }).then(function (resp) {        
          window.location = "index.html";        
      });*/
      window.location = "login.html";     
    }
    return {
      appdata: {
        userkey:'up'
      },
      
      doLogout: function (form) {
        logout();
      }
    };
  })();