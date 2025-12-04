import { addHandler } from '../lib/commands.js'

const insultos = [
  /bot de mierda/i,
  /pinche bot/i,
  /bot inutil/i,
  /bot pendejo/i,
  /bot feo/i,
  /bot baboso/i,
  /maldito bot/i,
  /bot menso/i,
  /bot mamon/i,
  /bot basura/i
]

const respuestas = [
  "¿Lo dices como si supieras programar? 😹",
  "Jajaja cálmate hacker de WhatsApp 🤓",
  "Si me hablas bonito funciono mejor 😼",
  "¿Estás enojado o así respiras? 💀",
  "Yo no tengo la culpa si no sabes usarme 😹",
  "Tantos insultos y ni un pull request 🙄",
  "Uy sí, qué miedo, el niño tóxico 😹",
  "Relájate pro player, es solo un bot 😸",
  "Si quieres te enseño a programar, campeón 😼",
  "Sigue así y te mando stickers feos 😾"
]

// Handler sin prefijo
addHandler({
  pattern: 'auto-insult',
  private: false,
  onlyPrefix: false, // ❗ Esto permite activarse sin prefijo
  handler: async (m, { conn }) => {

    let texto = m.text?.toLowerCase() || ""

    // Verifica si contiene insulto
    if (insultos.some(rgx => rgx.test(texto))) {
      let r = respuestas[Math.floor(Math.random() * respuestas.length)]
      await conn.reply(m.chat, r, m)
    }

  }
})