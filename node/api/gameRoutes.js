'use strict';

module.exports = function(app) {
  const game = require('./gameController');

  app.route('/player/')
    .post(game.createPlayer);
    // .put(game.updatePlayer)
    // .delete(game.deletePlayer);

  app.route('/player/:username')
    .get(game.getPlayer);
  
  // app.route('/players/:guid')
  //   .get(game.getPlayers)
};