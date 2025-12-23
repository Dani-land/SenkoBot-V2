import moment from 'moment-timezone'

const tagsMap = {
  main: '⁠☆ Información',
  jadibot: '☆ Sub Bot',
  downloader: '☆ Descargas',
  game: '☆ Juegos',
  gacha: '☆ Gacha RPG',
  rg: '☆ Registro',
  group: '☆ Grupos',
  nable: '☆ Funciones',
  nsfw: '☆ NSFW +18',
  buscadores: '☆ Buscadores',
  sticker: '☆ Stickers',
  econ: '☆ Economía',
  convertidor: '☆ Convertidores',
  logo: '☆ Logos Kawaii',
  tools: '☆ Herramientas',
  randow: '☆ Random',
  efec: '☆ Efectos de Audio',
  owner: '☆ Creador'
}

let handler = async (m, { conn }) => {
  const userId = m.mentionedJid?.[0] || m.sender
  const user = global.db.data.users[userId] || {}
  const name = await conn.getName(userId)
  const botname = conn.user?.name || '✿ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏'
  const fecha = moment.tz('America/México').format('DD/MM/YYYY')
  const hora = moment.tz('America/México').format('HH:mm:ss')
  const uptime = clockString(process.uptime() * 1000)
  const totalreg = Object.keys(global.db.data.users).length
  const limit = user.limite || 0

  const botTag = conn.user?.jid?.split('@')[0] || 'bot'
  const isBotOfc = conn.user?.id === global.conn?.user?.id
  const botStatus = isBotOfc
    ? `✐ *Bot Oficial:* wa.me/${botTag}`
    : `✐ *Sub Bot de:* wa.me/${global.conn?.user?.jid?.split('@')[0]}`

  const plugins = Object.values(global.plugins).filter(p => !p.disabled)
  const grouped = {}

  for (const plugin of plugins) {
    const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
    const tagList = Array.isArray(plugin.tags) ? plugin.tags : []
    const tag = tagList[0] || '__otros__'
    if (!grouped[tag]) grouped[tag] = []
    for (const cmd of cmds) {
      if (typeof cmd === 'string') grouped[tag].push(`⁠✿ .${cmd}`)
    }
  }

  let text = `╭─❀「 *Menú Principal de ${global.botname}* 」❀─╮
✐ Hola~ *${name}*~! ⊂⁠(⁠(⁠・⁠▽⁠・⁠)⁠)⁠⊃
『✦』 Soy *Senko AI*, tu asistente

📅 Fecha: *${fecha}*
🕑 Hora México: *${hora}*
🎀 Usuarios activos: *${totalreg}*
🍬 Tu límite de hoy: *${limit}*
🔋 Tiempo encendida: *${uptime}*
🤖 Estado: ${botStatus}

❥ *Sígueme en github*:
https://github.com/Dani-land
╰───────────────🌸╯\n`

  for (const tag of Object.keys(grouped)) {
    const section = tagsMap[tag] || '📚 Otros'
    text += `\n╭─🍥 *${section}* 🍥─╮\n`
    for (const cmd of grouped[tag]) {
      text += `⁠❍ ${cmd}\n`
    }
    text += '╰───────────────✿\n'
  }

  const channelRD = {
    id: '120363420575743790@newsletter',
    name: '✿ 𝑺𝒆𝒏𝒌𝒐𝑨𝑰 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 ♡'
  }

  const banner = 'https://files.catbox.moe/u3hxp7.jpg'
  const redes = 'https://www.instagram.com/dxnielrxz_77?igsh=Nm96OXFoaXZ5djMw'
  const textbot = `🍃 Gracias por usarme, *${name}*~\nNo olvides seguir el canal`

  await conn.sendMessage(m.chat, {
    video: { url: 'https://files.catbox.moe/j261f7.mp4' },
    caption: text,
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
        showAdAttribution: false,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
export default handler

function clockString(ms) {
  let h = Math.floor(ms / (1000 * 60 * 60))
  let m = Math.floor((ms / (1000 * 60)) % 60)
  let s = Math.floor((ms / 1000) % 60)
  return `${h}h ${m}m ${s}s`
}