import fetch from 'node-fetch'
import { lookup } from 'mime-types'

let handler = async (m, { conn, text }) => {

const canalID = "120363420575743790" // ⭐ ID DEL CANAL
const footerKawaii = "🌸 Powered by Danielrxz 👾 | Canal Oficial"

if (!text) 
return conn.reply(m.chat, `🌱 *Pon el enlace de Mediafire, onii-chan~*`, m)

if (!/^https:\/\/www\.mediafire\.com\//i.test(text)) 
return conn.reply(m.chat, `⚠️ *Ese enlace no es de Mediafire uwu*`, m)

try {
await m.react('⏳')

const api = `${global.APIs.delirius.url}/download/mediafire?url=${encodeURIComponent(text)}`
const res = await fetch(api)
const json = await res.json()

if (!json.status || !json.data?.filename || !json.data?.link)
throw new Error("No pude obtener el archivo desde la API (>_<)")

const file = json.data
const fileName = file.filename || "archivo"
const fileSize = file.size || "desconocido"
const fileMime = file.mime || lookup(file.extension?.toLowerCase()) || "application/octet-stream"

// Mediafire a veces trae link codificado
const finalURL = file.link.includes("u=") 
? decodeURIComponent(file.link.split("u=")[1]) 
: file.link

// 🌸 Mensaje kawaii
const caption = `
┏━━ 🎀 *DESCARGA MEDIAFIRE KAWAII* 🎀 ━━┓

🍓 *Archivo:* ${fileName}
🍡 *Peso:* ${fileSize}
🍥 *Tipo:* ${fileMime}

🌐 *Link original:* 
${text}

┗━━━━━━━━━━━━━━━━━━━━━━━┛

${footerKawaii}
`

// 🌸 Enviar del canal
await conn.sendMessage(
m.chat, 
{
document: { url: finalURL },
fileName: fileName,
mimetype: fileMime,
caption,
contextInfo: {
forwardingScore: 999, // fuerza etiqueta de reenviado
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: `${canalID}@newsletter`,
serverMessageId: 1,
newsletterName: "🌸 Powered by Danielrxz 👾 | Canal Oficial"
}
}
},
{ quoted: m }
)

await m.react('✔️')

} catch (e) {
await m.react('❌')
return conn.reply(m.chat, `⚠️ *Ocurrió un error uwu*\n\n> ${e.message}`, m)
}

}

handler.command = ['mf', 'mediafire']
handler.tags = ['dow']
handler.help = ['mf', 'mediafire']
handler.group = true

export default handler