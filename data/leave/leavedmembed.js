const { EmbedBuilder } = require('discord.js');

module.exports = function createLeaveDMEmbed(member) {
    return new EmbedBuilder()
        .setColor('#FF9900')
        .setTitle('👋 You left Wisdom Server')
        .setDescription(`Goodbye from **${member.guild.name}**.\n mat3awdsh Trj3e Lhad server!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
};
