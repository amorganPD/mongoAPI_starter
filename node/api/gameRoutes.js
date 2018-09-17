'use strict';

module.exports = function(app) {
  const game = require('./gameController');

  app.route('/gameInstance/')
    .post(game.createGameInstance);
    // .put(game.updatePlayer)
    // .delete(game.deletePlayer);

  app.route('/gameInstance/:guid')
    .get(game.getGameInstance);
  
  // app.route('/players/:guid')
  //   .get(game.getPlayers)
};