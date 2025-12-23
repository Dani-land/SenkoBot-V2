var handler = async (m, { conn, participants, usedPrefix, command }) => {
  // Verifica si se mencionó o respondió a alguien
  if (!m.mentionedJid[0] && !m.quoted) {
    return conn.reply(m.chat, `『✦』 Menciona o responde al mensaje del usuario para eliminarlo`, m);
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

  // Protecciones especiales
  if (user === conn.user.jid) {
    return conn.reply(m.chat, `⚔️.`No puedes eliminarme humano, m);
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `👑 No puedo eliminar a un owner sabes`, m);
  }

  if (user === ownerBot) {
    return conn.reply(m.chat, `✐ No puedes eliminar a mi creador`, m);
  }

  // Ejecuta la expulsión
  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    conn.reply(m.chat, `☁️` Usuario eliminado, porque ni idea, m);
  } catch (e) {
    conn.reply(m.chat, `⛔ *El bot no tiene permisos necesarios para eliminarlo*`, m);
  }
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
handler.register = true;

export default handler;
