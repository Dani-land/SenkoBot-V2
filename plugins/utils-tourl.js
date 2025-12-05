import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime) 
    return conn.reply(m.chat, `🌸✨ *Senpaii~, responde a una imagen o un videito para convertirlo a link UwU*`, m)

  await m.react('💗') // reacción kawaii de procesando~

  try {
    let media = await q.download()
    let isImageOrVideo = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)

    // Subida del archivo
    let link = await (isImageOrVideo ? uploadImage : uploadFile)(media)
    let img = await (await fetch(link)).buffer()

    let txt = `🌸✨ *Conversión kawaii lista UwU* ✨🌸\n\n`
    txt += `💖 *Enlace directo:* ${link}\n`
    txt += `🍡 *Enlace cortito:* ${await shortUrl(link)}\n`
    txt += `📦 *Tamaño:* ${formatBytes(media.length)}\n`
    txt += `⏳ *Expiración:* ${isImageOrVideo ? '∞ No expira, nyaa~' : 'Desconocido :c'}\n\n`
    txt += `👾 *Powered by Danielrxz* 💞`

    await conn.sendFile(m.chat, img, 'kawaii.jpg', txt, m, fkontak)
    await m.react('🎀') // éxito kawaii
  } catch (e) {
    await m.react('💔')
    return conn.reply(m.chat, `⚠️ *Ay no… ocurrió un error kawaii >///<*\n\n${e}`, m)
  }
}

handler.help = ['tourl']
handler.tags = ['utils']
handler.register = true
handler.command = ['tourl', 'upload']

export default handler

// =========================
// Funciones auxiliares UwU
// =========================

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}