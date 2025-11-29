// Respuestas kawaii aleatorias
const holaRespuestas = [
  "¡Hoooola~! (✿◠‿◠) ¿Qué necesitas, cosita linda?",
    "¡Holiii! (>‿<) ¿En qué puedo ayudarte hoy?",
    "¡Konnichiwaaa! (≧◡≦) ¿Qué tal tu día?",
    "¡Holi holi~! (☆▽☆) ¿Cómo te ayudo?",
    "¡Hola precios@! (๑>ᴗ<๑) ¿Qué buscas?",
    "¡Hoooola! UwU ¿Qué puedo hacer por ti?",
    "¡Waaah hola! (⌒‿⌒) ¿Qué necesitas?",
    "Holiiiiiii~ (ฅ•.•ฅ) ¿Qué onda?"
]

// Detectar mensaje sin prefijo
conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0]
  if (!m.message) return
  const texto = (m.message.conversation || m.message.extendedTextMessage?.text || "").toLowerCase()

  // Si el mensaje contiene "hola"
  if (texto.includes("hola")) {
    const random = holaRespuestas[Math.floor(Math.random() * holaRespuestas.length)]
    await conn.sendMessage(m.key.remoteJid, { text: random }, { quoted: m })
  }
})