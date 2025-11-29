import fetch from "node-fetch"

const handler = async (m, { args, conn }) => {
  try {

    // ❀ Validación
    if (!args[0]) 
      return conn.reply(m.chat, `🌸✨ *Por favor senpai, mándame un enlace de Instagram o Facebook uwu*`, m)

    await m.react('🩷')

    let links = []

    // ❀ Primer intento: API Vreden
    try {
      const api1 = `${global.APIs.vreden.url}/api/igdownload?url=${encodeURIComponent(args[0])}`
      const res = await fetch(api1)
      const json = await res.json()

      if (json.resultado?.respuesta?.datos?.length) {
        links = json.resultado.respuesta.datos.map(v => v.url)
      }
    } catch (e) {}

    // ❀ Segundo intento: API Delirius
    if (!links.length) {
      try {
        const api2 = `${global.APIs.delirius.url}/download/instagram?url=${encodeURIComponent(args[0])}`
        const res = await fetch(api2)
        const json = await res.json()

        if (json.status && json.data?.length) {
          links = json.data.map(v => v.url)
        }
      } catch (e) {}
    }

    // ❀ Si no obtuvo nada
    if (!links.length)
      return conn.reply(m.chat, `❌ *Nyaa~ no pude descargar el contenido, intenta con otro enlace.*`, m)

    // ❀ Enviar archivos con etiqueta de canal
    for (let media of links) {

      await conn.sendMessage(m.chat, {
        video: { url: media },
        mimetype: "video/mp4",
        caption: `🌸✨ *Descarga completada uwu*\n\n👾 Powered by *Danielrxz*\n📢 Canal: @${120363420575743790}`,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: "💞 Descarga kawaii",
            body: "Contenido obtenido exitosamente",
            sourceUrl: "https://whatsapp.com/channel/120363420575743790", 
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnailUrl: "https://i.imgur.com/7wQ7I3S.jpeg" // Imagen kawaii
          }
        }
      }, { quoted: m })

      await m.react('💖')
    }

  } catch (err) {
    await m.react('💔')
    return conn.reply(m.chat, `⚠️ *Ocurrió un error kawaii...*\n\n${err.message}`, m)
  }
}

handler.command = ['instagram', 'ig', 'facebook', 'fb']
handler.tags = ['dow']
handler.help = ['instagram <url>', 'facebook <url>', 'ig <url>', 'fb <url>']
handler.group = true

export default handler