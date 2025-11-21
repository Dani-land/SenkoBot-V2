import { search, download } from 'aptoide-scraper'

var handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.reply(m.chat, `🌱 Por favor, ingrese el nombre de la apk para procesarlo.`, m)
try {
await m.react('🕒')
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let txt = `*乂 DESCARGAS APTOIDE 乂*\n\n`
txt += `✏️ Nombre : ${data5.name}\n`
txt += `📦 Package : ${data5.package}\n`
txt += `🍄 Versión : ${data5.lastup}\n`
txt += `⚖️ Peso :  ${data5.size}`
await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m)
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.reply(m.chat, `ꕥ El archivo es demasiado pesado.`, m)
}
await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null }, { quoted: m })
await m.react('✔️')
} catch (error) {
await m.react('✖️')
return conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Details.\n\n${error.message}`, m)
}}

handler.tags = ['descargas']
handler.help = ['apkmod']
handler.command = ['apk', 'modapk', 'aptoide']
handler.group = true
handler.register = true

export default handler