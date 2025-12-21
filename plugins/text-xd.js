//código básico by Danielrxz 
let handler = async (m, { conn }) => {

  if (!m.text) return

  if (m.text.trim() !== 'XD') return

  const stickers = [
    'https://files.catbox.moe/whdcmw.webp',
    'https://files.catbox.moe/suhk2y.webp',
    'https://files.catbox.moe/09am96.webp'
  ]

  const sticker = stickers[Math.floor(Math.random() * stickers.length)]

  await conn.sendMessage(
    m.chat,
    { sticker: { url: sticker } },
    { quoted: m }
  )
}

handler.customPrefix = /^XD$/i
handler.command = new RegExp()

export default handler