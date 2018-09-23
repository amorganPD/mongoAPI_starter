var API = (function (api, $, undefined) {

  api.useMockData = false;
  api.url = "http://localhost:3000/api";  

  api.createNewUser = function (Username, DisplayName, callback) {
    $.ajax({
      dataType: "json",
      url: api.url + "/user/",
      method: "POST",
      data: {
        username: Username,
        displayName: DisplayName
      },
      success: function (data) {
        callback.caller(callback.data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        callback.error();
        console.log(JSON.stringify(errorThrown));
      }
    });
  }
  api.validateUser = function (Username, callback) {
    $.ajax({
      dataType: "json",
      url: api.url + "/user/" + Username,
      method: "GET",
      data: {},
      success: function (data) {
        if (data.length == 0) {
          callback.error();
        }
        else {
          callback.caller(callback.data);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        callback.error();
        console.log(JSON.stringify(errorThrown));
      }
    });
  }

  return api;
})(API || {}, jQuery || {});