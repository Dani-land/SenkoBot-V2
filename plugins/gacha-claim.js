import { loadClaimDB, saveClaimDB } from '../lib/global-claim.js'
import fetch from 'node-fetch'

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(
    m.chat,
    "🍥 *Uso correcto:* .c <id>\n\nEjemplo: _.c 25_",
    m
  )

  const id = text.trim()

  // Cargar DB
  const db = loadClaimDB()

  // Revisar si ya está reclamada
  if (db[id]) {
    return conn.reply(
      m.chat,
      `💔 Esa waifu ya fue reclamada por *@${db[id]}*`,
      m,
      { mentions: [db[id] + "@s.whatsapp.net"] }
    )
  }

  // Obtener waifu
  let res = await fetch(`https://api.waifu.im/info?item_id=${id}`)
  let json = await res.json()

  if (!json || !json.images || !json.images[0]) {
    return conn.reply(m.chat, "⚠️ No encontré ninguna waifu con ese ID…", m)
  }

  const waifu = json.images[0]

  // Guardar claim
  db[id] = m.sender.replace(/@.+/, '')
  saveClaimDB(db)

  // Enviar imagen y mensaje kawaii
  await conn.sendMessage(
    m.chat, 
    {
      image: { url: waifu.url },
      caption:
`🌸 *WAIFU RECLAMADA CON ÉXITO* 🌸

• 🍡 *ID:* ${id}
• 💖 *Nombre:* ${waifu.artist?.name ?? "Desconocida"}
• ✨ *Reclamada por:* @${m.sender.split("@")[0]}

_Tenla y cuídala, oni-chan~_ 💞`,
      mentions: [m.sender]
    }
  )
}

handler.help = ["claim"]
handler.tags = ["gacha"]
handler.command = ["c", "claim"]

export default handler