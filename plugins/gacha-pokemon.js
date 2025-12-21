import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `✨ Usa: ${usedPrefix}pokemon <nombre o id>`, m);
  let pok = text.toLowerCase().trim();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pok)}`);
    if (!res.ok) throw 'Pokémon no encontrado';
    const data = await res.json();

    const name = data.name;
    const id = data.id;
    const types = data.types.map(t => t.type.name).join(', ');
    const sprite = data.sprites.front_default;

    let caption = `⚡ *Pokémon encontrado!* ⚡\n\n`;
    caption += `🔸 *Nombre:* ${name.charAt(0).toUpperCase()+name.slice(1)}\n`;
    caption += `🔹 *ID:* ${id}\n`;
    caption += `🌿 *Tipo(s):* ${types}\n`;

    if (sprite) {
      await conn.sendMessage(m.chat, { image: { url: sprite }, caption }, { quoted: m });
    } else {
      await conn.reply(m.chat, caption, m);
    }
  } catch (e) {
    await conn.reply(m.chat, '❌ Pokémon no encontrado o error de la API.', m);
  }
};

handler.command = ['pokemon'];
handler.tags = ['gacha'];
handler.help = ['pokemon <nombre/id>'];

export default handler;