export async function before(m, { groupMetadata }) {
  if (!m.text || !globalThis.prefix.test(m.text)) {
    return;
  }

  const usedPrefix = globalThis.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase(); 

  const validCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
        return true;
      }
    }
    return false;
  };


  let chat = globalThis.db.data.chats[m.chat];
  let id = this.user.jid;
  let settings = globalThis.db.data.settings[id];
  let owner = [...globalThis.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)

  if (chat.adminonly) return;
  if (settings.self) return;
  if (!command) return;
  if (command === 'mute') return;
  if (chat.bannedGrupo && !owner) return

/*try {
let chtxt = ` ֯　ׅ🫗ֶ֟ㅤ *Usuario ›* ${m.pushName}

 ׄ 🎋 ׅ り *Comando usado ›* ${command}
 ׄ 🌾 ׅ り *Visita ›* api.stellarwa.xyz
 ׄ 🌿 ׅ り *Bot ›* ${wm}
 ׄ 🥗 ׅ り *Versión del bot ›* ^0.0.9`

let ppch = await this.profilePictureUrl(m.sender, 'image').catch(_ => "https://stellarwa.xyz/files/1757206448404.jpeg")
global.conn.sendMessage(my.ch5, { text: chtxt,
contextInfo: { 
externalAdReply: {
title: "🕸 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢́𝗡 🕸",
body: '🐼 ¡Nuevo comando usado!',
thumbnailUrl: ppch,
sourceUrl: redes,
mediaType: 2,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null }) 
} catch (e) {
console.log(`[ 🐼  ]  Error al enviar el mensaje al canal.\n[ 🕸  ]  ${e}`)
}*/

  if (validCommand(command, globalThis.plugins)) {
  } else {
    const comando = command;
    await m.reply(`☁️ El comando *${comando}* no existe.\n> Usa *${usedPrefix}help* para ver la lista de comandos disponibles.`);
  }
}