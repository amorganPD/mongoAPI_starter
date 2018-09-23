var SITE = (function(site, undefined) {

  site.hostIP = 'ws://localhost:8080';
  site.port = '8080';

  site.onReady = function () {
    site.socket.connect();

    window.addEventListener('resize', function() { 
      // placeholder
    });
  };
  
  window.addEventListener('load', function() {
    site.onReady();
  }, false);

  return site;
})(SITE || {});