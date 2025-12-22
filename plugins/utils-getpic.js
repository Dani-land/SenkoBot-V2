let handler = async (m, { conn }) => {
   let texto = await m.mentionedJid
   let who = texto.length > 0 ? texto[0] : (m.quoted ? await m.quoted.sender : false)

  if (!who) {
    return m.reply('☁️ Porfavor, Etiqueta o responde al usuario del que quieras ver su foto de perfil.');
  }

  try {
    const img = await conn.profilePictureUrl(who, 'image').catch(() => null);

    if (!img) {
      return conn.sendMessage(
        m.chat,
        {
          text: `✖️ No se pudo obtener la foto de perfil de @${who.split('@')[0]}.`,
          mentions: [who],
        },
        { quoted: m }
      );
    }

    await conn.sendMessage(
      m.chat,
      {
        image: { url: img },
        mentions: [who],
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    await m.reply('🕸 No se pudo obtener la imagen. Intenta nuevamente.');
  }
};

handler.help = ['pfp', 'getpic'];
handler.tags = ['utils'];
handler.command = ['pfp', 'getpic'];

export default handler;