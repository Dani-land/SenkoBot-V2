import fetch from 'node-fetch'

const TRIGGER = /^senko\s(.+)/i

let handler = async (m, { conn }) => {
  if (!m.text) return
  if (!TRIGGER.test(m.text)) return

  const pregunta = m.text.replace(/^senko\s/i, '').trim()
  if (!pregunta) return

  try {
    const api = `https://api-adonix.ultraplus.click/ai/gemini?text=${encodeURIComponent(pregunta)}&apikey=Adofreekey`

    const res = await fetch(api)
    const json = await res.json()

    if (!json || !json.result)
      throw new Error('La IA no respondió')

    await conn.reply(
      m.chat,
      `🤖✨ *Senko AI responde:*\n\n${json.result}`,
      m
    )

  } catch (e) {
    console.error('[SENKO AI ERROR]', e)
    await conn.reply(
      m.chat,
      '💔 Ocurrió un error al pensar… nya~',
      m
    )
  }
}

handler.customPrefix = TRIGGER
handler.command = new RegExp() // SIN PREFIJO

export default handler