'use strict';

module.exports = function(app) {
  const game = require('./gameController');

  app.route('/gameInstance/')
    .post(game.createGameInstance)
    .put(game.updateGameInstance);

  app.route('/gameInstance/:guid')
    .get(game.getGameInstance)
    .delete(game.deleteGameInstance);

  app.route('/gameInstance/activeUser/:guid/:username')
    .put(game.addActiveUser)
    .delete(game.removeActiveUser);
};