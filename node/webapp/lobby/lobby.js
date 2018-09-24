var Site = (function(site, api, undefined) {

  var Lobby = function () {

    var user;
    var PopulateDisplayName = function (User) {
      user = User[0];
      document.getElementById("userDisplayName").innerHTML = user.displayName;
    }

    this.onReady = function () {
      uri = site.route.decodeURI();
      var callback = {
        caller: PopulateDisplayName,
        data: null,
        error: console.log
      }
      api.getUser(uri.username, callback);
    }

    site.onReadyCallbacks.push(this.onReady);
  };

  site.lobby = new Lobby();

  return site;
})(Site || {}, API || {});