import fetch from "node-fetch";

const handler = async (m, { text }) => {
  try {

    const keyword = text || "waifu";
    const url = `https://api.delirius.store/search/gelbooru?query=${encodeURIComponent(keyword)}`;

    const res = await fetch(url);
    const json = await res.json();

    if (!json.status || !json.data || json.data.length === 0) {
      return m.reply(`⚠️ No se encontraron resultados para: *${keyword}*`);
    }

    const randomIndex = Math.floor(Math.random() * json.data.length);
    const item = json.data[randomIndex];
    const img = item.thumbnail;

    if (!img) return m.reply("⚠️ No se pudo obtener la URL de la imagen.");

    const characterId = Math.floor(Math.random() * 1000000);

    const caption = `
🍓 *Waifu obtenida con éxito* 🍥

💖 *Tags:* ${keyword}
🎀 *Fuente:* Gelbooru
🆔 *ID:* ${characterId}

✨ Usa *.claim ${characterId}* para reclamarla ✨
`;

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("⚠️ Ocurrió un error al conectar con la API de Delirius.");
  }
};

handler.command = ['rw', 'rollwaifu'];
handler.tags = ['gacha'];
handler.help = ['rw', 'rollwaifu'];

export default handler;