import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin, isOwner }) => {
  const userId = m.mentionedJid?.[0] || m.quoted?.sender || text;

  // Validación: solo admins o owner
  if (!isAdmin && !isOwner) {
    throw '🍃 *Solo los propietarios o admins pueden usar el comando.*';
  }

  if (!userId) {
    throw '🍃 *menciona a alguien.*';
  }

  const user = global.db.data.users[userId] || {};
  user.mute = user.mute || false;

  if (command === 'mute') {
    if (user.mute) throw '⚠️ *El usuario ya está silenciado.*';
    user.mute = true;
    await conn.reply(
      m.chat,
      `🔇 *El usuario fue silenciado correctamente.`,
      m
    );
  }

  if (command === 'unmute') {
    if (!user.mute) throw '⚠️ *El usuario no estaba silenciado.*';
    user.mute = false;
    await conn.reply(
      m.chat,
      `✅ *El usuario ya no está silenciado correctamente.`,
      m
    );
  }

  global.db.data.users[userId] = user;
};

// 🧹 Elimina los mensajes de los usuarios silenciados
handler.before = async (m, { conn }) => {
  const sender = m.sender;
  const isMuted = global.db.data.users[sender]?.mute;

  if (isMuted && !m.key.fromMe) {
    try {
      await conn.sendMessage(m.chat, { delete: m.key });
    } catch (e) {
      console.error('❌ Error al eliminar mensaje:', e);
    }
  }
};

handler.command = ['mute', 'unmute'];
handler.group = true; // Solo en grupos
handler.admin = true; // Requiere admin
handler.botAdmin = true; // El bot debe ser admin

export default handler;