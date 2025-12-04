let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) {
return conn.reply(m.chat, `❀ Debes citar un sticker para convertir a imagen.`, m)
}
await m.react('🕒')
let xx = m.quoted
let imgBuffer = await xx.download()   
if (!imgBuffer) {
await m.react('✖️')
return conn.reply(m.chat, `ꕥ No se pudo descargar el sticker.`, m)
}
await conn.sendMessage(m.chat, { image: imgBuffer, caption: '🍄 *Aquí tienes ʕ⁠っ⁠•⁠ᴥ⁠•⁠ʔ⁠っ*' }, { quoted: m })
await m.react('✔️')
}

handler.help = ['toimg']
handler.tags = ['utils']
handler.command = ['toimg', 'jpg', 'img'] 

export default handler