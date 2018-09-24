var Site = (function(site, undefined) {

  site.hostIP = 'ws://localhost:8080';
  site.port = '8080';

  site.onReadyCallbacks = site.onReadyCallbacks || [];

  site.onReady = function () {
    site.onReadyCallbacks.forEach(function(callback) {
      callback();
    });
    // site.socket.connect();

    window.addEventListener('resize', function() { 
      // placeholder
    });
  };
  
  window.addEventListener('load', function() {
    site.onReady();
  }, false);

  return site;
})(Site || {});