import moment from 'moment-timezone'

let handler = async (m, { conn }) => {
  const userId = m.mentionedJid?.[0] || m.sender
  const user = global.db.data.users[userId] || {}
  const name = await conn.getName(userId)
  const botname = conn.user?.name || '✿ 𝑺𝒆𝒏𝒌𝒐𝑺𝒂𝒏'
  const fecha = moment.tz('America/California').format('DD/MM/YYYY')
  const hora = moment.tz('America/California').format('HH:mm:ss')
  const uptime = clockString(process.uptime() * 1000)
  const totalreg = Object.keys(global.db.data.users).length
  const limit = user.limite || 0

  const botTag = conn.user?.jid?.split('@')[0] || 'bot'
  const isBotOfc = conn.user?.id === global.conn?.user?.id
  const botStatus = isBotOfc
    ? `✐ *Bot Oficial:* wa.me/${botTag}`
    : `✐ *Sub Bot de:* wa.me/${global.conn?.user?.jid?.split('@')[0]}`

  const plugins = Object.entries(global.plugins)
    .filter(([_, p]) => !p.disabled)

  const grouped = {}

  for (const [filename, plugin] of plugins) {
    if (!filename.includes('-')) continue

    const [category, ...cmdParts] = filename.replace('.js', '').split('-')
    const commandName = cmdParts.join('-')

    if (!grouped[category]) grouped[category] = []
    grouped[category].push(`✿ .${commandName}`)
  }

  let text = `╭─❀「 *Menú Principal de ${global.botname}* 」❀─╮
✐ Hola~ *${name}*~! ⊂⁠(⁠(⁠・⁠▽⁠・⁠)⁠)⁠⊃
『✦』 Soy *Senko AI*, tu asistente

✐ Fecha: *${fecha}*
✐ Hora México: *${hora}*
✐ Usuarios activos: *${totalreg}*
✐ Tu límite de hoy: *${limit}*
✐ Tiempo encendida: *${uptime}*
✐ Estado: ${botStatus}

❥ *Sígueme en github*:
https://github.com/Dani-land
╰───────────────╯\n`

  for (const category of Object.keys(grouped).sort()) {
    text += `\n╭─🍥 *${category.toUpperCase()}* 🍥─╮\n`
    for (const cmd of grouped[category].sort()) {
      text += `⁠❍ ${cmd}\n`
    }
    text += '╰───────────────✿\n'
  }

  const channelRD = {
    id: '120363420575743790@newsletter',
    name: '✿ 𝑺𝒆𝒏𝒌𝒐𝑨𝑰 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 ♡'
  }

  const banner = global.banner || 'https://files.catbox.moe/u3hxp7.jpg'
  const gif = global.gif || 'https://qu.ax/GzAr9'
  const redes = 'https://www.instagram.com/dxnielrxz_77'
  const textbot = `🍃 Gracias por usarme, *${name}*~`

  await conn.sendMessage(m.chat, {
    video: { url: gif },
    gifPlayback: true,
    caption: text,
    contextInfo: {
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1
      },
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
