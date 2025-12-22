import { fbdl } from 'ruhend-scraper'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

var handler = async (m, { conn, args, command, usedPrefix, text }) => {

const isCommand7 = /^(facebook|fb|facebookdl|fbdl)$/i.test(command)

async function reportError(e) {
await conn.reply(m.chat, `🍃 ocurrió un error`, m, rcanal)
console.log(e)
}

async function scrapeMetadata(pageUrl) {
try {
const resp = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
const html = await resp.text()
const $ = cheerio.load(html)
const getMeta = (name, attr = 'content') =>
$(`meta[property="${name}"]`).attr(attr) ||
$(`meta[name="${name}"]`).attr(attr) ||
null
return {
title: getMeta('og:title') || getMeta('twitter:title'),
description: getMeta('og:description') || getMeta('twitter:description'),
siteName: "Facebook"
}
} catch {
return { title: null, description: null, siteName: "Facebook" }
}
}

if (isCommand7) {

if (!text) return conn.reply(m.chat, `🍃 *Por favor, Ingrese un enlace de facebook*`, m, rcanal)

if (!args[0].match(/www.facebook.com|fb.watch|web.facebook.com|business.facebook.com|video.fb.com/g)) 
return conn.reply(m.chat, '⛔ El enlace no es valido', m, rcanal)

conn.reply(m.chat, '🍥 Descargando tu video, espera un momento', m, {
contextInfo: { 
forwardingScore: 2022, 
isForwarded: true, 
externalAdReply: {
title: packname,
body: '𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆 - 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿',
sourceUrl: redes,
thumbnail: icons
}
}
})

m.react(rwait)

try {

const fb = await fbdl(args[0])
if (!fb?.data?.length) throw new Error('No se obtuvo video.')
const video = fb.data[0]
const videoUrl = video.url

const meta = await scrapeMetadata(args[0])

let caption = `꒰ฅ^•ﻌ•^ฅ꒱  *𝗗𝗲𝘀𝗰𝗮𝗿𝗴𝗮 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸*  

╭─━━━━━━━━━━━━━━━━─╮
📰 *𝑻𝒊́𝒕𝒖𝒍𝒐*  
➤ ${meta.title || 'No disponible'}

📎 *𝑫𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊𝒐́𝒏*  
➤ ${meta.description || 'No disponible'}

🐾 *𝑺𝒊𝒕𝒊𝒐*  
➤ Facebook

🔗 *𝑬𝒏𝒍𝒂𝒄𝒆 𝒐𝒓𝒊𝒈𝒊𝒏𝒂𝒍*  
➤ ${args[0]}
╰─━━━━━━━━━━━━━━━━─╯

${global.team}
`

await conn.sendFile(m.chat, videoUrl, 'facebook.mp4', caption, m)

} catch (e) {
reportError(e)
}
}
}

handler.help = ['fb']
handler.tags = ['dow']
handler.command = ['fb', 'facebook']
handler.register = true

export default handler