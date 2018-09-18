'use strict';

module.exports = function(app) {
  const player = require('./playerController');

  app.route('/player/')
    .post(player.createPlayer)
    .put(player.updatePlayer);
    // .delete(game.deletePlayer);

  app.route('/player/:username')
    .get(player.getPlayer);
};