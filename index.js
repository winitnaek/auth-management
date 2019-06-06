const macWs = (function () {

  function checkPermissions(data) {

  };

  function checkAccess(data) {

  }

  function inValidLogin() {

  }
  function userLoginTest(empId, pass) {
    var credentials = {userName: empId, password:pass};
    getUserProfile(true,empId);
  }
  function userLogin(empId, pass) {
    var credentials = {userName: empId, password:pass};
    return fetch('/sws/r/webapi/login?username='+empId+'&password='+pass, { method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin'}).then(function (resp) {
      if (resp.ok) {
        console.log('resp');
        console.log(resp);
        getUserProfile(true,empId);         
      }else{
        $('#inputUsername').addClass('is-invalid');
        $('#userHelpID').show();
      }
     });
  }
  function isValidLoginForm(form) {
    return true;
  }
  return {
    appdata: {
      userdata: null,
      userkey: 'up',
      nuval: 'nouser'
    },
    verifyPermissions: function (data) {
      checkPermissions(data);
    },
    verifyAccess: function (data) {
      checkAccess(data);
    },
    doLogin: function (form) {
      if (isValidLoginForm(form)) {
        userLogin($('#inputUsername').val(), $('#inputPassword').val());
      }
    },
    getURLParameter: function (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }
  };
})();
$(document).ready(function () {
  $('#cont').hide();
  $('#userHelpID').hide();
  var uval = macWs.getURLParameter('user');
  
  getUserProfile = function (formbased,userid) {
    var upp ="{\r\n            \"userId\": \"001907\"}"
    setUserProfile(upp);
  };
  setUserProfile = function(userProfile){
   var userdata = JSON.parse(userProfile);
   console.log('setUserProfile userdata');
   console.log(userdata);
   sessionStorage.setItem("up", userProfile);
   if (userdata) {
    window.location = "index.html";
   }
  };
  var auto = macWs.getURLParameter('auto');
  if(auto){
    getUserProfile();
  }else{
	  $('#cont').show();
  }
  if (uval && uval == macWs.appdata.nuval) {
    $('#inputUsername').addClass('is-invalid');
    $('#userHelpID').show();
  }
});