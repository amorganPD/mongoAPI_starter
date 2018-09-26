var Site = (function(site, api, $, undefined) {

  var Lobby = function () {

    var user;
    var listSize = 0;

    var UpdateGameInstances = function (gameInstances) {
      $.each(gameInstances, function (i, gameInstance) {
        $('#gameInstances').append($('<option>', { 
          value: i,
          text : gameInstance 
        }));
        listSize = i;
      });
    };
    var AddGameInstance = function (gameInstance) {
      listSize++;
      $('#gameInstances').append($('<option>', { 
        value: listSize,
        text : gameInstance.guid
      }));
      document.getElementById('inputGameName').value = "";
    };

    var PopulateDisplayName = function (User) {
      user = User[0];
      document.getElementById("userDisplayName").innerHTML = user.displayName;
      UpdateGameInstances(user.gameInstances);
    };

    var ValidateGameName = function (Name) {
      if ((Name == null ) || (Name == undefined ) || (Name == "" )) {
        document.getElementById("errorMessage-name").classList.add("error-message-show");
        return false;
      }
      else {
        document.getElementById("errorMessage-name").classList.remove("error-message-show");
        return true;
      }
    }
    
    this.createNewGameInstance = function (event) {
      var name = document.getElementById('inputGameName').value;
      if (ValidateGameName(name)) {
        var callback = {
          caller: AddGameInstance,
          data: "",
          error: console.log
        }
        api.createNewGameInstance(name, user, callback);
      }
      return event.preventDefault();
    }
    
    this.enterGameInstance = function (event) {
      gameInstance = document.getElementById('gameInstances');
      if (gameInstance.selectedIndex >= 0) {
        var gameInstanceData = {
          guid: gameInstance.options[gameInstance.selectedIndex].text,
          username: user.username
        }
        var encodedData = encodeURIComponent(JSON.stringify(gameInstanceData))
        window.open("/game/" + site.route.rootFileName + "?" + encodedData, "_self");
      }
      return event.preventDefault();
    }

    this.onReady = function () {
      uri = site.route.decodeURI();
      var callback = {
        caller: PopulateDisplayName,
        data: null,
        error: console.log
      }
      api.getUser(uri.username, callback);
    };

    site.onReadyCallbacks.push(this.onReady);
  };

  site.lobby = new Lobby();

  return site;
})(Site || {}, API || {}, jQuery);