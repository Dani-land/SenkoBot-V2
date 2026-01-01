var handler = async (m, { conn, usedPrefix, command, text }) => {
  let number;

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `? Menciona a alguien para promoverlo`, m);
  }

  if (isNaN(text)) {
    if (text.includes('@')) {
      number = text.split('@')[1];
    }
  } else {
    number = text;
  }

  if (!number && m.quoted) {
    number = m.quoted.sender.split('@')[0];
  }

  if (!number) {
    return conn.reply(m.chat, `? No encontre a nadie valido para promover.`, m);
  }

  if (number.length > 13 || number.length < 10) {
    return conn.reply(m.chat, `? Ese n¨²mero no es valido`, m);
  }

  let user = number + '@s.whatsapp.net';

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    conn.reply(m.chat, `¡º?¡» *@${number} a sido promovido administrador`, m, { mentions: [user] });
  } catch (e) {
    conn.reply(m.chat, `Ocurrio un error
    est¨¢s seguro seguro de que tengo los permisos necesarios??`, m);
  }
};

handler.help = ['promote'];
handler.tags = ['grupo'];
handler.command = ['promote', 'darpija', 'promover'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
