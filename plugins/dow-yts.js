import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa una búsqueda de Youtube.`, m)
try {
await m.react('🎁')
let results = await yts(text)
let tes = results.all
let teks = results.all.map(v => {
switch (v.type) {
case 'video': return `「✦」RESULTADOS DE *<${text}>*

☁️ *${v.title}*
> 📦 Canal » *${v.author.name}*
> ⌛ Duración » *${v.timestamp}*
> ✏️ Subido » *${v.ago}*
> 👀 Vistas » *${v.views}*
> 🔗 Enlace » ${v.url}`}}).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n')
await conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)
await m.react('✔️')
} catch (e) {
await m.react('✖️')
conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Destails.\n\n` + e.message, m)
}}

handler.help = ['ytsearch']
handler.tags = ['dow']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.group = true

export default handler