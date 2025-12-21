import { igdl } from 'ruhend-scraper'

let handler = async (m, { conn, args, command, usedPrefix, text }) => {

  const kawaiiError = async (e) => {
    await conn.reply(m.chat, `❌ *Ocurrió un error nya~*\nIntenta más tarde...`, m)
    console.log("[IG ERROR] =>", e)
  }

  // Validación del comando
  if (!/^(ig|instagram|instadl|igdl)$/i.test(command)) return

  let url = args[0] || text
  if (!url)
    return conn.reply(m.chat,
      `🌱 *Por favor, ingresa un enlace válido de Instagram*  
Ejemplo:
${usedPrefix}ig https://www.instagram.com/reel/xxxxx`,
      m
    )

  if (!/instagram\.com|instagr\.am|ig\.me/.test(url))
    return conn.reply(m.chat, `⛔ *Ese enlace no es de Instagram, nya~*`, m)

  url = url.split("?")[0]

  await conn.reply(m.chat, `⏳ *Descargando tu video, espera un momento…*`, m)

  try {
    const res = await igdl(url)

    let data =
      res?.data ||
      res?.result ||
      res?.media ||
      (Array.isArray(res) ? res : null)

    if (!data || data.length === 0)
      throw new Error("Instagram devolvió vacío")

    for (const item of data) {

      let mediaUrl =
        item?.url ||
        item?.download_link ||
        item?.video_url ||
        item?.image_url ||
        item

      if (!mediaUrl) continue

      let isVideo = /mp4|video/i.test(mediaUrl)
      let extension = isVideo ? "mp4" : "jpg"

      let caption = `🍓  *Tu contenido está listo*`

      await conn.sendFile(m.chat, mediaUrl, `insta.${extension}`, caption, m)
      await new Promise(r => setTimeout(r, 500))
    }

  } catch (e) {
    kawaiiError(e)
  }
}

handler.help = ['ig']
handler.tags = ['dow']
handler.command = ['ig', 'instagram']
handler.register = true

export default handler