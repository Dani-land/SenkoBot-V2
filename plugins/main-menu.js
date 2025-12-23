import moment from 'moment-timezone'

const tagsMap = {
  'main': '☆ Información',
  'jadibot': '☆ Sub Bot',
  'downloader': '☆ Descargas',
  'game': '☆ Juegos',
  'gacha': '☆ Gacha RPG',
  'rg': '☆ Registro',
  'group': '☆ Grupos',
  'nable': '☆ Funciones',
  'nsfw': '☆ NSFW +18',
  'buscadores': '☆ Buscadores',
  'sticker': '☆ Stickers',
  'econ': '☆ Economía',
  'convertidor': '☆ Convertidores',
  'logo': '☆ Logos Kawaii',
  'tools': '☆ Herramientas',
  'randow': '☆ Random',
  'efec': '☆ Efectos de Audio',
  'owner': '☆ Creador'
}

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender
    const user = global.db.data.users[userId] || {}
    const name = await conn.getName(userId)
    const botname = conn.user?.name || '✿ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏'
    const fecha = moment.tz('America/Mexico_City').format('DD/MM/YYYY')
    const hora = moment.tz('America/Mexico_City').format('HH:mm:ss')
    const uptime = clockString(process.uptime() * 1000)
    const totalreg = Object.keys(global.db.data.users).length
    const limit = user.limite || user.limit || 0

    const botTag = conn.user?.jid?.split('@')[0] || 'bot'
    const isBotOfc = conn.user?.id === global.conn?.user?.id
    const botStatus = isBotOfc
      ? `✐ *Bot Oficial:* wa.me/${botTag}`
      : `✐ *Sub Bot de:* wa.me/${global.conn?.user?.jid?.split('@')[0]}`

    const plugins = Object.values(global.plugins).filter(p => !p.disabled && p.tags)
    const grouped = {}

    plugins.forEach(plugin => {
      const tagList = Array.isArray(plugin.tags) ? plugin.tags : []
      tagList.forEach(tag => {
        if (!tag) return
        if (!grouped[tag]) grouped[tag] = []
        const help = Array.isArray(plugin.help) ? plugin.help : [plugin.help]
        help.forEach(h => {
          if (h) grouped[tag].push(h)
        })
      })
    })

    let text = `╭─❀「 *Menú Principal de ${botname}* 」❀─╮
✐ Hola~ *${name}*~! ⊂⁠(⁠(⁠・⁠▽⁠・⁠)⁠)⁠⊃
『✦』 Soy *Senko AI*, tu asistente

📅 Fecha: *${fecha}*
🕑 Hora México: *${hora}*
🎀 Usuarios activos: *${totalreg}*
🍬 Tu límite de hoy: *${limit}*
🔋 Tiempo encendida: *${uptime}*
🤖 Estado: ${botStatus}

❥ *_sígueme en github_*:
https://github.com/Dani-land
╰───────────────🌸╯\n`

    const sortedTags = Object.keys(grouped).sort((a, b) => {
      if (a === 'main') return -1
      if (b === 'main') return 1
      return a.localeCompare(b)
    })

    for (const tag of sortedTags) {
      if (!grouped[tag].length) continue
      const section = tagsMap[tag] || `📚 Otros [${tag}]`
      text += `\n╭─🍥 *${section}* 🍥─╮\n`
      const uniqueCmds = [...new Set(grouped[tag])]
      for (const cmd of uniqueCmds) {
        text += `⁠❍ ${usedPrefix}${cmd}\n`
      }
      text += '╰───────────────✿\n'
    }

    const channelRD = {
      id: '120363420575743790@newsletter',
      name: '✿ 𝑺𝒆𝒏𝒌𝒐𝑨𝑰 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 ♡'
    }

    const banner = 'https://files.catbox.moe/u3hxp7.jpg'
    const redes = 'https://www.instagram.com/dxnielrxz_77?igsh=Nm96OXFoaXZ5djMw'
    const textbot = `🍃 Gracias por usarme, ${name}~\nNo olvides seguir el canal`

    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/j261f7.mp4' },
      caption: text,
      gifPlayback: true,
      contextInfo: {
        mentionedJid: [m.sender, userId],
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name,
          serverMessageId: -1
        },
        forwardingScore: 999,
        externalAdReply: {
          title: botname,
          body: textbot,
          thumbnailUrl: banner,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
                                         }
