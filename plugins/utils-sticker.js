import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {

  // 🌸 .s sin imagen
  if (!m.quoted && !args[0]) {
    return conn.reply(
      m.chat,
      `🍓 *nya... por favor mándame una imagen JPG/PNG o un videíto de menos de 8s y respóndeme con* _${usedPrefix + command}_ *para convertirlo en sticker 💖*`,
      m
    )
  }

  let stiker = false

  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/webp|image|video/g.test(mime)) {

      // 🌸 Límite de duración kawaii
      if (/video/g.test(mime))
        if ((q.msg || q).seconds > 8)
          return m.reply(`⛔ *Nyaaa~ el video no puede durar más de 8 segundos, senpai.*`)

      let media = await q.download?.()
      if (!media)
        return conn.reply(
          m.chat,
          `⚠️ *Nyaa~ la conversión falló... intenta enviarme la imagen/video primero y luego usa el comando uwu.*`,
          m
        )

      let output

      try {
        stiker = await sticker(media, false, global.wm, global.author)
      } catch (e) {
        // Si falla el método principal, intentamos los otros
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) output = await webp2png(media)
          else if (/image/g.test(mime)) output = await uploadImage(media)
          else if (/video/g.test(mime)) output = await uploadFile(media)

          if (typeof output !== 'string') output = await uploadImage(media)

          stiker = await sticker(false, output, global.wm, global.author)
        }
      }

    } else if (args[0]) {

      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.wm, global.author)
      } else {
        return m.reply(`❌ *El enlace no es válido, senpai...*`)
      }
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker)
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    else
      conn.reply(m.chat, `⚠️ *No pude crear el sticker... intenta de nuevo uwu*`, m)
  }
}

handler.help = ['s', 'sticker']
handler.tags = ['utils']
handler.command = ['s', 'sticker']

export default handler

const isUrl = (text) => {
  return text.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/,
      'gi'
    )
  )
}