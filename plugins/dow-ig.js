import { igdl } from 'ruhend-scraper'

let handler = async (m, { conn, args, command, usedPrefix, text }) => {

  const kawaiiError = async (e) => {
    await conn.reply(m.chat, `❌💔 *Ocurrió un error nyan~*\nIntentaaa de nuevo`, m, global.rcanal || {})
    console.log(e)
  }

  const isCmd = /^(ig|instagram|instadl|igdl)$/i.test(command)
  if (!isCmd) return

  let url = args[0] || text
  if (!url)
    return conn.reply(m.chat,
      `🌱 *Ingresa un enlace válido de Instagram, onegai~*  
Ejemplo:
${usedPrefix}ig https://www.instagram.com/reel/xxxxx`,
      m, global.rcanal || {}
    )

  if (!/instagram\.com|instagr\.am|ig\.me/.test(url))
    return conn.reply(m.chat, `🚫 *Ese enlace no es de Instagram, nya~*`, m, global.rcanal || {})

  await conn.reply(m.chat, `⏳ *Estoy descargando tu videito, espera tantito…*`, m, {
    contextInfo: {
      forwardingScore: 2022,
      isForwarded: true,
      externalAdReply: {
        title: global.packname || "SenkoBot ✨",
        body: "Descargando desde Instagram…",
        thumbnail: global.icons || global.icon || null,
        sourceUrl: global.redes || global.channel || ''
      }
    }
  })

  try {
    const res = await igdl(url)
    let data = res?.data || res

    if (!data || data.length === 0)
      throw new Error("No se encontró contenido")

    for (const item of data) {
      let mediaUrl = item.url || item
      let isVideo = /mp4|video/i.test(mediaUrl)
      let extension = isVideo ? "mp4" : "jpg"

      let caption = `🍓✨  *Contenido  listo!*  
ᴘʀᴇᴘᴀʀᴀ ᴛᴜ ᴘᴀʟᴏᴍɪᴛᴀꜱ~ (｡•̀ᴗ-)✧`

      await conn.sendFile(m.chat, mediaUrl, `insta.${extension}`, caption, m)
      await new Promise(res => setTimeout(res, 600))
    }

  } catch (e) {
    kawaiiError(e)
  }

}

handler.help = ['ig']
handler.tags = ['dow']
handler.command = ['ig', 'instagram', 'igdl', 'instadl']
handler.register = true

export default handler
