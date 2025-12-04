import fetch from "node-fetch";

const handler = async (m, { conn }) => {
  try {

    // Genera página aleatoria para más variedad
    const page = Math.floor(Math.random() * 50) + 1;

    const query = `
      query {
        Page(page: ${page}, perPage: 1) {
          characters(sort: FAVOURITES_DESC) {
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
      }
    `;

    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const json = await res.json();
    const character = json.data.Page.characters[0];

    if (!character) return m.reply("⚠️ No se encontró waifu.");

    const name = character.name.full;
    const img = character.image.large;
    const anime = character.media.nodes[0]?.title.romaji || "Desconocido";

    const caption = `
🌸 *Waifu obtenida con éxito, senpai* 🌸

💖 *Nombre:* ${name}
🎀 *Anime:* ${anime}
🆔 *ID:* ${character.id}

✨ Usa *.claim ${character.id}* para reclamarla ✨
`;

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("⚠️ Ocurrió un error kawaii al obtener waifu.");
  }
};

handler.command = ['rw', 'rollwaifu'];
handler.tags = ['gacha'];
handler.help = ['rw', 'rollwaifu'];

export default handler;