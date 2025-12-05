import { fbdl } from 'ruhend-scraper'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, command, usedPrefix, text }) => {

  const isFB = /^(facebook|fb|fbdl|facebookdl)$/i.test(command)

  const sendError = async (e) => {
    await conn.reply(m.chat, `💔✨ *Nyaaa~ ocurrió un error inesperado...*\n> ${e.message}`, m, global.rcanal || {})
    console.log(e)
  }

  async function getMeta(url) {
    try {
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Senko-Kawaii)' }
      })
      const html = await resp.text()
      const $ = cheerio.load(html)

      const get = (prop) =>
        $(`meta[property="${prop}"]`).attr("content") ||
        $(`meta[name="${prop}"]`).attr("content") ||
        null

      return {
        title: get("og:title") || get("twitter:title"),
        desc: get("og:description") || get("twitter:description")
      }
    } catch {
      return { title: null, desc: null }
    }
  }

  if (isFB) {

    if (!args[0])
      return conn.reply(m.chat, `🌸✨ *Senpai, por favor envíame un enlace de Facebook uwu*`, m, global.rcanal || {})

    if (!/facebook\.com|fb\.watch|web\.facebook\.com/.test(args[0]))
      return conn.reply(m.chat, `❌ *Ese enlace no es válido para Facebook, nyan~*`, m, global.rcanal || {})

    await conn.reply(m.chat, `⏳💞 *Descargando el videíto de Facebook… uwu*\n> Espera un momentito, senpai~`, m, {
      contextInfo: {
        forwardingScore: 2024,
        isForwarded: true,
        externalAdReply: {
          title: global.packname || 'SenkoBot',
          body: "FACEBOOK - DOWNLOAD",
          sourceUrl: global.redes || global.channel || '',
          thumbnail: global.icons || global.icon || null
        }
      }
    })

    m.react(global.rwait || '⏱️')

    try {

      const fb = await fbdl(args[0])
      if (!fb?.data?.length) throw new Error("No se obtuvo video de Facebook.")

      const video = fb.data[0].url

      const meta = await getMeta(args[0])

      const caption = `
꒰₊˚⊹❤️ *Vídeo de Facebook descargadito uwu* ꒱
━━━━━━━━━━━━━━
🌸 *Título:* ${meta.title || "No disponible uwu"}
📘 *Descripción:* ${meta.desc || "No disponible nyan~"}
🏷️ *Sitio:* Facebook
🔗 *Enlace original:* ${args[0]}
━━━━━━━━━━━━━━
> ${global.wm || 'SenkoBot'}
`

      await conn.sendFile(m.chat, video, "fb.mp4", caption, m)

      m.react("💖")

    } catch (e) {
      await sendError(e)
    }
  }

}

handler.help = ['facebook', 'fb']
handler.tags = ['dow']
handler.command = ['fb', 'facebook', 'fbdl']
handler.register = true

export default handler
