// utils/checkPermissions.js
const { serverConfigCollection } = require('../mongodb'); 
const { EmbedBuilder } = require('discord.js');
const cmdIcons = require('../UI/icons/commandicons');
const { PermissionsBitField } = require('discord.js');

module.exports = async function checkPermissions(interaction) {
    const guild = interaction.guild;
    const serverId = guild.id;
    
    const configMangerData = await serverConfigCollection.findOne({ serverId });
    const botManagers = configMangerData?.botManagers || [];

    const isOwner = interaction.user.id === guild.ownerId;
    const isBotManager = botManagers.includes(interaction.user.id);
    const member = await guild.members.fetch(interaction.user.id);
    const hasAdminRole = member.roles.cache.some(role => guild.roles.cache.get(role.id)?.permissions.has('Administrator'));

    if (!hasAdminRole && !isBotManager) {
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setAuthor({
                name: 'Permission Denied',
                iconURL: cmdIcons.rippleIcon,
                url: "https://discord.gg/xQF9f9yUEM"
            })
            .setDescription(
                '- فقط من لديه صلاحية "Administrator" أو من مدراء البوت يمكنه استخدام هذا الأمر.\n' +
                '- إذا كنت تعتقد أن هناك خطأ، يرجى التواصل مع مدير السيرفر أو مدير البوت.\n' +
                '- إذا كنت مدير البوت، أضف معرف المستخدم عبر أمر **/setup-serverconfig**.'
            );

        await interaction.reply({
            embeds: [embed],
            flags : 64
        });

        setTimeout(() => {
            interaction.deleteReply().catch(() => {});
        }, 5000);

        return false;
    }

    // تحقق من صلاحية الأدمن أو مالك السيرفر أو المدراء
    if (
        member.id === guild.ownerId ||
        botManagers.includes(member.id) ||
        member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
        return true;
    }
};
