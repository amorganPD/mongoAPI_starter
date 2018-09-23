'use strict';

module.exports = function(app) {
  const game = require('./gameController');

  app.route('/api/gameInstance/')
    .post(game.createGameInstance)
    .put(game.updateGameInstance);

  app.route('/api/gameInstance/:guid')
    .get(game.getGameInstance)
    .delete(game.deleteGameInstance);

  app.route('/api/gameInstance/activeUser/:guid/:username')
    .put(game.addActiveUser)
    .delete(game.removeActiveUser);
};