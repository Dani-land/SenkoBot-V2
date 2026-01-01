import fs from 'fs'
import path from 'path'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {

  const name = await conn.getName(m.sender)
  const fecha = moment.tz('America/California').format('DD/MM/YYYY')
  const hora = moment.tz('America/California').format('HH:mm:ss')
  const uptime = clockString(process.uptime() * 1000)

  // 🤖 BOT PRINCIPAL O SUBBOT
  const isPrincipal = conn.user.jid === global.conn.user.jid
  const botType = isPrincipal ? '🤖 Bot Principal' : '🧩 Sub Bot'

  // 📂 LEER PLUGINS
  const pluginsPath = path.join(process.cwd(), 'plugins')
  const files = fs.readdirSync(pluginsPath).filter(f => f.endsWith('.js'))

  const categories = {}

  for (const file of files) {
    if (!file.includes('-')) continue

    const [cat, cmd] = file.replace('.js', '').split('-')
    if (!categories[cat]) categories[cat] = []
    categories[cat].push(cmd)
  }

  let menu = `
╭─❀ 「 ${global.botname} 」 ❀─╮
✐ Hola *${name}* 💖
📌 Estado: ${botType}
📅 Fecha: ${fecha}
🕒 Hora: ${hora}
🔋 Uptime: ${uptime}
╰───────────────╯
`

  for (const cat of Object.keys(categories).sort()) {
    const catName = cat.charAt(0).toUpperCase() + cat.slice(1)

    menu += `\n╭─🍥 *${catName}* 🍥─╮\n`
    for (const cmd of categories[cat].sort()) {
      menu += `✿ ${usedPrefix}${cmd}\n`
    }
    menu += `╰───────────────✿\n`
  }

  // 📌 PRIMERO: BANNER (IMAGEN)
  await conn.sendMessage(m.chat, {
    image: { url: global.banner }, // ✅ banner por URL
    caption: menu.trim(),
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.my.ch1,
        newsletterName: global.my.name1,
        serverMessageId: -1
      },
      externalAdReply: {
        title: global.botname,
        body: global.dev,
        thumbnailUrl: global.banner,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: global.redes
      }
    }
  }, { quoted: m })

  // 📌 DESPUÉS: VIDEO
  await conn.sendMessage(m.chat, {
    video: { url: 'https://qu.ax/squFj' },
    caption: '🍃 Gracias por usar *Senko AI*'
  }, { quoted: m })
}

handler.help = ['menu']
handler.command = ['menu', 'menú', 'help']
handler.tags = ['main']

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}