import fetch from "node-fetch"

const handler = async (m, { conn, text, usedPrefix, command }) => {
try {
if (!text) return conn.reply(m.chat, `🍃 *Nee~ ingresa lo que quieres que te responda*`, m)

await m.react('🤖')

const api = `https://zenzxz-api.vercel.app/ai/gpt?text=${encodeURIComponent(text)}`
const res = await fetch(api)
const json = await res.json()

if (!json.result) throw `⛔ La API no respondió.`

const replyText = 
`🍥 *Respuesta IA para ti~* 🍥

${json.result}

╰─🍂 *Powered by Danielrxz 👾*`

const fakeContext = {
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363420575743790@newsletter",
serverMessageId: 100,
newsletterName: "Danielrxz"
}}
}

await conn.sendMessage(m.chat, { text: replyText }, { quoted: m, ...fakeContext })
await m.react('✔️')

} catch (e) {
await m.react('✖️')
return conn.reply(m.chat, `⚠️ Ocurrió un error.\n${e}`, m)
}
}

handler.command = ['ia', 'chatgpt', 'ai']
handler.help = ['ia']
handler.tags = ['ia']
handler.group = false

export default handler