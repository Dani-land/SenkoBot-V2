let handler = async (m, { conn }) => {
  // Asegura que exista texto
  if (!m.text) return

  // Solo responde si el mensaje es EXACTAMENTE "XD"
  if (m.text.trim() !== 'XD') return

  const stickers = [
    'https://files.catbox.moe/whdcmw.webp',
    'https://files.catbox.moe/suhk2y.webp',
    'https://files.catbox.moe/09am96.webp'
  ]

  // Elegir sticker aleatorio
  const sticker = stickers[Math.floor(Math.random() * stickers.length)]

  await conn.sendMessage(
    m.chat,
    { sticker: { url: sticker } },
    { quoted: m }
  )
}

// 🔥 SIN PREFIJO
handler.customPrefix = /^XD$/i
handler.command = new RegExp()

export default handler