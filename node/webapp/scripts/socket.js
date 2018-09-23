var SITE = (function(site, undefined) {

  var Socket = function () {
    _self = this;
    var websocket;
    
    this.connect = function () {
      websocket = new WebSocket(site.hostIP);
      websocket.addEventListener('open',function open(data) {
        console.log(data);
        setTimeout(function () {
          _self.send('{"message":"this is a message"}');
        }, 500);
      });
      websocket.addEventListener('message', function incoming(message, flags) {
        if ((typeof message.data) == (typeof 'string')) {
          var dataObject = JSON.parse(message.data);
        }
        else {
          console.log(message);
        }
      });      
    };
    this.send = function (data) {
      if (websocket.readyState === websocket.OPEN) {
        websocket.send(data);
      }
    }
    
  };

  site.socket = new Socket();

  return site;
})(SITE || {});