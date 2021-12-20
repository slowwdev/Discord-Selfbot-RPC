const client = require('..');
const chalk = require('chalk');
const rpc = require('discordrpcgenerator');
const config = require('.././config.json');

if (config.mode === 'game') {
  try {
    rpc.getRpcImage(config.settings.game.applicationID, config.settings.largeImageKey).then(image => {
      const presence = new rpc.Rpc()
        .setName(config.settings.game.name)
        .setType('PLAYING')
        .setApplicationId(config.settings.game.applicationID)
        .setState(config.settings.game.state)
        .setDetails(config.settings.game.details)
        .setAssetsLargeImage(image.id)
        .setAssetsLargeText(image.name);
      client.user.setPresence(presence.toDiscord());
    });
    // Set the status
    if (config.status === 'online' || config.status === 'idle' || config.status === 'dnd') {
      client.user.setStatus(config.status);
    }

    if (config.status === 'offline' || config.status === 'invisible') {
      console.log('Status cant be set to' + config.status + '\nPlease change the status in the config.json file');
    }

    // Done !
    console.log(chalk.hex('#800080')('Game RPC enabled successfully!'));
    console.log(chalk.hex('#800080')('Game: ' + config.settings.game.name));
    console.log(chalk.hex('#800080')('Status: ' + config.status));
  } catch (err) {
    console.error(err);
  }
}