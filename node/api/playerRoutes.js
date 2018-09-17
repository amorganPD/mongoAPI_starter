'use strict';

module.exports = function(app) {
  const player = require('./playerController');

  app.route('/player/')
    .post(player.createPlayer);
    // .put(game.updatePlayer)
    // .delete(game.deletePlayer);

  app.route('/player/:username')
    .get(player.getPlayer);
  
  // app.route('/players/:guid')
  //   .get(game.getPlayers)
};