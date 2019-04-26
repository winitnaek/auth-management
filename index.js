const macWs = (function () {

  function checkPermissions(data) {

  };

  function checkAccess(data) {

  }

  function inValidLogin() {

  }

  function userLogin(empId, pass) {
    var credentials = {userName: empId, password:pass};
    return fetch('/api/login/f?a=' + btoa(JSON.stringify(credentials)), { method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin'}).then(function (resp) {
      if (resp.ok) {
        getUserProfile(true);         
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
  
  getUserProfile = function (formbased) {
    fetch('/api/user/getProfile', { method: 'GET',
    credentials: 'same-origin'}).then(response => {
      if (response.ok) {
        response.text().then(userProfile => {
          console.log('getUserProfile userProfile');
          console.log(userProfile);
          //var upp ="{\r\n            \"userId\": \"001907\",\r\n            \"firstName\": \"\",\r\n            \"\": \"Fullerton\",\r\n            \"dataset\": \"00_EE_W2_DATA\",\r\n            \"securitytokn\": \"fhfh484jer843je848rj393jf\",\r\n            \"branding\": \"base64ImageData\",\r\n            \"userTheme\": \"Default\",\r\n            \"roles\": [\r\n                \"EE\"\r\n            ],\r\n            \"applications\": [\r\n                {\r\n                    \"id\": \"610bbc96-10dc-4874-a9fc-ecf0edf4260b\",\r\n                    \"name\": \"YearEndFactory\",\r\n                    \"accessIds\": [\r\n                        {\r\n                            \"id\": \"b9f6848d-30a7-451d-d2fa-86f3afa4df67\",\r\n                            \"visible\": true\r\n                        }\r\n                    ],\r\n                    \"permissions\": {\r\n                        \"viewDocument\": [\r\n                            1,\r\n                            0,\r\n                            0,\r\n                            0,\r\n                            0\r\n                        ]\r\n                    }\r\n                },\r\n                {   \r\n                \"id\": \"dd4282b1-0544-4ad1-8e0b-6a8d278ffd5c\",\r\n                \"name\": \"eeAdminFactory\",\r\n                \"accessIds\": [\r\n                    {\r\n                        \"id\": \"b55f51a1-0273-4457-8226-013a35d32080\",\r\n                        \"visible\": true\r\n                    }\r\n                ],\r\n                \"permissions\": {\r\n                    \"viewDocument\": [\r\n                        1,\r\n                        0,\r\n                        0,\r\n                        0,\r\n                        0\r\n                    ]\r\n                }\r\n            }\r\n            ],\r\n            \"themeList\": [\r\n                {\r\n                    \"id\": \"Default\",\r\n                    \"name\": \"Default\"\r\n                },\r\n                {\r\n                    \"id\": \"HighContrast\",\r\n                    \"name\": \"High Contrast\"\r\n                },\r\n                {\r\n                    \"id\": \"WhiteOnBlack\",\r\n                    \"name\": \"White On Black\"\r\n                },\r\n                {\r\n                    \"id\": \"BlackOnWhite\",\r\n                    \"name\": \"Black On White\"\r\n                }\r\n            ]\r\n        }"
          setUserProfile(userProfile);
        });
      }else{
        if (formbased) {
          $('#userHelpID').show();
          $('#inputUsername').addClass('is-invalid');
          macLogin.doLogout();
        } 
      }
    });
  };
  setUserProfile = function(userProfile){
   var userdata = JSON.parse(userProfile);
   console.log('setUserProfile userdata');
   console.log(userdata);
   sessionStorage.setItem("up", userProfile);
   if (userdata) {
    window.location = "dash.html";
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