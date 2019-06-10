var userDataUp = sessionStorage.getItem('up');
var userdata = JSON.parse(userDataUp);
if (!userdata) {
  window.location = "login.html?user=nouser";
}
const macLogin = (function () {
  function logout() {
    sessionStorage.removeItem(macLogin.appdata.userkey);
    fetch('/sws/r/webapi/logout', {
      credentials: 'same-origin'
    }).then(function (resp) {
      console.log("Logout Success: " + JSON.stringify(resp));
      window.location = "login.html?user=nouser";
    }).catch(function(error) {
      console.log('There has been a problem with "logout": ', error.message);
      window.location = "login.html?user=nouser";
    });
  }
  return {
    appdata: {
      userkey: 'up'
    },

    doLogout: function (form) {
      logout();
    }
  };
})();