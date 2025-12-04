const handler = async (m, { conn }) => {
  try {
    // let who = m?.message?.extendedTextMessage?.contextInfo?.participant || m?.mentionedJid[0] || await m?.quoted?.sender;
   let texto = await m.mentionedJid
   let who = texto.length > 0 ? texto[0] : (m.quoted ? await m.quoted.sender : false)
    if (!who) return m.reply('☁️ Menciona al usuario que deseas promover a administrador.');

    const groupMetadata = await conn.groupMetadata(m.chat);
    const participant = groupMetadata.participants.find(participant => participant.jid === who);

    if (participant && participant.admin) {
    return conn.reply(m.chat, `📝 *@${who.split('@')[0]}* ya es administrador del grupo!`, m, { mentions: [who] });
    }

    await conn.groupParticipantsUpdate(m.chat, [who], 'promote');
    await conn.reply(m.chat, `✅ *@${who.split('@')[0]}* ha sido promovido a administrador del grupo!`, m, { mentions: [who] });
  } catch (e) {
    await m.reply(`🌾 Error.`);
  }
};

handler.help = ['promote'];
handler.tags = ['grupo'];
handler.command = ['promote'];
handler.admin = true;
handler.botAdmin = true;

export default handler;