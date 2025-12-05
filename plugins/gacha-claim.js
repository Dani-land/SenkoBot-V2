import { loadClaimDB, saveClaimDB } from '../lib/global-claim.js'
import fetch from 'node-fetch'

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(
    m.chat,
    "🍥 *Uso correcto:* .claim <id>\n\nEjemplo: _.claim 25_\n\n_Usa .rw para obtener una waifu con su ID_",
    m
  )

  const id = text.trim()

  const db = loadClaimDB()

  if (db[id]) {
    return conn.reply(
      m.chat,
      `💔 Esa waifu ya fue reclamada por *@${db[id]}*`,
      m,
      { mentions: [db[id] + "@s.whatsapp.net"] }
    )
  }

  try {
    const query = `
      query ($id: Int) {
        Character(id: $id) {
          id
          name {
            full
          }
          image {
            large
          }
          media(perPage: 1) {
            nodes {
              title {
                romaji
              }
            }
          }
        }
      }
    `

    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query,
        variables: { id: parseInt(id) }
      })
    })

    const json = await res.json()
    const character = json?.data?.Character

    if (!character) {
      return conn.reply(m.chat, "⚠️ No encontré ninguna waifu con ese ID... Usa *.rw* para obtener waifus válidas.", m)
    }

    db[id] = m.sender.replace(/@.+/, '')
    saveClaimDB(db)

    const name = character.name.full
    const img = character.image.large
    const anime = character.media.nodes[0]?.title.romaji || "Desconocido"

    await conn.sendMessage(
      m.chat, 
      {
        image: { url: img },
        caption:
`🌸 *WAIFU RECLAMADA CON ÉXITO* 🌸

• 🍡 *ID:* ${id}
• 💖 *Nombre:* ${name}
• 🎀 *Anime:* ${anime}
• ✨ *Reclamada por:* @${m.sender.split("@")[0]}

_Tenla y cuídala, oni-chan~_ 💞`,
        mentions: [m.sender]
      },
      { quoted: m }
    )

  } catch (e) {
    console.error(e)
    return conn.reply(m.chat, "⚠️ Error al buscar la waifu. Intenta de nuevo.", m)
  }
}

handler.help = ["claim"]
handler.tags = ["gacha"]
handler.command = ["c", "claim"]

export default handler
