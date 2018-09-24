var Site = (function(site, api, $, undefined) {

  var Route = function () {
    var rootFileName = "";

    var EncodeURI = function (Username) {
      var uri = {
        username: Username
      }
      return encodeURIComponent(JSON.stringify(uri));
    }
    var ValidateUsername = function (Username) {
      if ((Username == null ) || (Username == undefined ) || (Username == "" )) {
        document.getElementById("errorMessage-username").innerHTML = "Invalid Username.";
        document.getElementById("errorMessage-username").classList.add("error-message-show");
        return false;
      }
      else {
        document.getElementById("errorMessage-username").classList.remove("error-message-show");
        return true;
      }
    }
    var ValidateDisplayName = function (Username) {
    if ((Username == null ) || (Username == undefined ) || (Username == "" )) {
      document.getElementById("errorMessage-displayName").classList.add("error-message-show");
      return false;
      }
      else {
        document.getElementById("errorMessage-displayName").classList.remove("error-message-show");
        return true;
      }
    }

    var errorUserAlreadyExists = function () {
      document.getElementById("errorMessage-username").classList.add("error-message-show");
      document.getElementById("errorMessage-username").innerHTML = "Username Already Exists.";
    }
    var errorNoUserFound = function () {
      document.getElementById("errorMessage-username").classList.add("error-message-show");
      document.getElementById("errorMessage-username").innerHTML = "No User Found.";
    }

    var WindowOpen = function(data) {
      window.open(data, "_self");
    }
    
    this.decodeURI = function() {
      if (location.search == "" || location.search == undefined) {
        console.log("Error: No Data")
      }
      else {
        URIString = location.search.substr(1);
        if(URIString.search('aspxerrorpath') < 0) {
          return JSON.parse(decodeURIComponent(URIString));
        }
      }
  };
    
    this.validateUser = function (event) {
      var username = document.getElementById('inputUserName').value;
      if (ValidateUsername(username)) {
        var callback = {
          caller: WindowOpen,
          data: "/lobby/" + rootFileName + "?" + EncodeURI(username),
          error: errorNoUserFound
        }
        api.validateUser(username, callback);
      }
      return event.preventDefault();
    };

    this.createNewUser = function (event) {
      var username = document.getElementById('inputUserName').value;
      var displayName = document.getElementById('inputDisplayName').value;
      if (ValidateUsername(username) && ValidateDisplayName(displayName)) {
        var callback = {
          caller: WindowOpen,
          data: "/lobby/" + rootFileName + "?" + EncodeURI(username),
          error: errorUserAlreadyExists
        }
        api.createNewUser(username, displayName, callback);
      }
      return event.preventDefault();
    }
    
  };

  site.route = new Route();

  return site;
})(Site || {}, API || {}, jQuery);