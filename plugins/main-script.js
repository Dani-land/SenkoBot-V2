import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://github.com/Dani-land/SenkoBot-V2')

    if (!res.ok) throw new Error('Error al obtener datos del repositorio')
    let json = await res.json()

    let txt = `*乂  S C R I P T  -  M A I N  乂*\n\n`
    txt += `✩  *Nombre* : ${json.name}\n`
    txt += `✩  *Visitas* : ${json.watchers_count}\n`
    txt += `✩  *Peso* : ${(json.size / 1024).toFixed(2)} MB\n`
    txt += `✩  *Actualizado* : ${moment(json.updated_at).tz('America/California').format('DD/MM/YY - HH:mm:ss')}\n`
    txt += `✩  *Url* : ${json.html_url}\n`
    txt += `✩  *Forks* : ${json.forks_count}\n`
    txt += `✩  *Stars* : ${json.stargazers_count}\n\n`
    txt += `> *Danielrxz*`

    await conn.sendMessage(m.chat, {
      text: txt,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: '🍃 Senko AI v2.0.0',
          body: 'Repositorio oficial del bot',
          thumbnailUrl: 'https://files.catbox.moe/2mzjm9.jpg',
          sourceUrl: json.html_url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch {
    await conn.reply(m.chat, '⚠️ Ocurrió un error al obtener el repositorio.', m)
    await m.react('❌')
  }
}

handler.help = ['script', 'sc']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true

export default handler