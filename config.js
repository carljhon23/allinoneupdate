const { ActivityType } = require('discord.js');

module.exports = {
  ownerId: '123456789012345678',
  status: {
    rotateDefault: [
      { name: 'Wisdom Movies', type: ActivityType.Watching },
      { name: 'Wisdom Games', type: ActivityType.Playing },
      { name: 'Wisdom Live', type: ActivityType.Streaming, url: 'https://www.twitch.tv/glaceytt' },
      { name: 'Apollo BElvedere', type: ActivityType.Listening },
    ],
    songStatus: true
  },
  spotifyClientId: "f71a3da30e254962965ca2a89d6f74b9",
  spotifyClientSecret: "199a619d22dd4e55a4a2c1a7a3d70e63",
}
