import ws from 'ws';
import fs from 'fs';

const handler = async (m, { conn, groupMetadata }) => {
    const groupName = groupMetadata.subject;
    const groupCreator = groupMetadata.ownerJid ? '@' + groupMetadata.ownerJid.split('@')[0] : groupMetadata.owner ? '@' + groupMetadata.owner.split('@')[0] : 'Desconocido';
    const totalParticipants = groupMetadata.participants.length;

    let totalCoins = 0;
    let registeredUsersInGroup = 0;

    const chatId = m.chat;
    const chat = globalThis.db.data.chats[chatId] || {};
    const chatUsers = global.db.data.users || {};

    groupMetadata.participants.forEach(participant => {
        const user = chatUsers[participant.id];
        if (user) {
            registeredUsersInGroup++;
            totalCoins += user.chocolates || 0;
        }
    });

    const rawPrimary = typeof chat.primaryBot === 'string' ? chat.primaryBot : '';
    const botprimary = rawPrimary.endsWith('@s.whatsapp.net') ? `@${rawPrimary.split('@')[0]}` : 'Aleatorio';

    const settings = {
        bot: chat.bannedGrupo ? '✘ Desactivado' : '✓ Activado',
        antiLinks: chat.antilinks ? '✓ Activado' : '✘ Desactivado',
        welcomes: chat.welcome ? '✓ Activado' : '✘ Desactivado',
        alerts: chat.alerts ? '✓ Activado' : '✘ Desactivado',
        gacha: chat.gacha ? '✓ Activado' : '✘ Desactivado',
        rpg: chat.rpg ? '✓ Activado' : '✘ Desactivado',
        nsfw: chat.nsfw ? '✓ Activado' : '✘ Desactivado',
        adminMode: chat.adminonly ? '✓ Activado' : '✘ Desactivado',
        botprimary: botprimary,
    };

    try {
      let message = `🍋‍🟩۫᷒ᰰ⃘ׅ᷒  *Grupo ›* ${groupName}\n\n`
      message += `𖹭  ׄ  ְ 🎋 *Creador ›* ${groupCreator}\n`
      message += `𖹭  ׄ  ְ 🌱 Bot Primario › *${settings.botprimary}*\n`
      message += `𖹭  ׄ  ְ 👥 Participantes › *${totalParticipants}*\n`
      message += `𖹭  ׄ  ְ 🫂 Registrados › *${registeredUsersInGroup}*\n`
      message += `𖹭  ׄ  ְ 🪙 Dinero › *${totalCoins.toLocaleString()} ${currency}*\n\n`
      message += `🫗۫᷒ᰰ⃘ׅ᷒  *Configuraciones:*\n`
      message += `ׅ  ׄ 🌿 ׅ り ${bot} › *${settings.bot}*\n`
      message += `ׅ  ׄ 🌿 ׅ り AntiLinks › *${settings.antiLinks}*\n`
      message += `ׅ  ׄ 🌿 ׅ り Bienvenidas › *${settings.welcomes}*\n`
      message += `ׅ  ׄ 🌿 ׅ り Alertas › *${settings.alerts}*\n`
      message += `ׅ  ׄ 🌿 ׅ り Nsfw › *${settings.nsfw}*\n`
      message += `ׅ  ׄ 🌿 ׅ り ModoAdmin › *${settings.adminMode}*`

        const mentionOw = groupMetadata.ownerJid ? groupMetadata.ownerJid : groupMetadata.owner ? groupMetadata.owner : '';
        const mentions = [rawPrimary, mentionOw].filter(Boolean);

        await conn.reply(m.chat, message.trim(), m, { mentions });
    } catch (e) {
        await m.reply(`❌ Error: ${e}`);
    }
};

handler.help = ['gp', 'groupinfo'];
handler.tags = ['group'];
handler.command = ['gp', 'groupinfo'];

export default handler;