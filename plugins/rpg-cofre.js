const handler = async (m, { isPrems, conn }) => {
  if (!global.db.data.users[m.sender]) {
    throw `🌸 *¿Quién eres tú?* No estás en mi base de datos... ¡Regístrate primero, tontito~!* 😾`;
  }

  const lastCofreTime = global.db.data.users[m.sender].lastcofre || 0;
  const timeToNextCofre = lastCofreTime + 86400000;

  if (Date.now() < timeToNextCofre) {
    const tiempoRestante = timeToNextCofre - Date.now();
    const mensajeEspera = `💢 *¡Ya te di un cofrecito hoy, ¿no es suficiente?!*  
⏳ Vuelve en *${msToTime(tiempoRestante)}*, no seas tan desesperado, baka~ 😤💗`;
    await conn.sendMessage(m.chat, { text: mensajeEspera }, { quoted: m });
    return;
  }

  const img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557947304.jpeg';
  const dia = Math.floor(Math.random() * 100);
  const tok = Math.floor(Math.random() * 10);
  const ai = Math.floor(Math.random() * 40);
  const expp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].coin += dia;
  global.db.data.users[m.sender].diamonds += ai;
  global.db.data.users[m.sender].joincount += tok;
  global.db.data.users[m.sender].exp += expp;
  global.db.data.users[m.sender].lastcofre = Date.now();

  const texto = `
╭━━ 🎁 𝑪𝒐𝒇𝒓𝒆 𝑫𝒆 𝑵𝒊𝒏𝒐 💕 ━━╮
┃ *¡Tadaaa~!* Cofrecito especial entregado 💝
┃ ¿No te emocionas al ver mis regalos? Eres raro...
╰━━━━━━━━━━━━━━━━━━━━━⬣

╭── 🌟 𝑹𝒆𝒄𝒐𝒎𝒑𝒆𝒏𝒔𝒂𝒔 𝒄𝒐𝒏 𝒂𝒎𝒐𝒓 ──╮
┃ 💸 *Moneditas lindas:* ${dia} ${moneda}
┃ ⚜️ *Tokens mágicos:* ${tok}
┃ 💎 *Diamantes brillantes:* ${ai}
┃ ✨ *Exp ganada (¡qué pro!):* ${expp}
╰━━━━━━━━━━━━━━━━━━━━━⬣

🌸 *No te acostumbres tanto a mis cofres...*  
¡Pero si eres bueno tal vez mañana te dé otro~!* 😚💕`;

  try {
    await conn.sendFile(m.chat, img, 'cofre_nino.jpg', texto, fkontak);
  } catch (error) {
    throw `😿 *¡Hmpf! Algo falló al entregarte el cofre...*  
Tal vez no merecías tanto cariño hoy...`;
  }
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre'];
handler.level = 5;
handler.group = true;
handler.register = true;

export default handler;

// ⏰ Formateador de tiempo estilo Nino
function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}h ${minutes}m`;
}
