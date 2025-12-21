import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🍥 *nyaa~*  
 Por favor, escribe algo para buscar imágenes en Pinterest`, 
      m
    );
  }

  await m.react("🕒");
  conn.reply(
    m.chat,
    `🍃 *Estoy buscando tus imágenes espera…*  
⏳ dame unos segunditos`,
    m
  );

  try {
    let query = text + " hd";
    let { data } = await axios.get(
      `https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(query)}`
    );

    // Tomar 10 imágenes
    let images = data.slice(0, 10).map(i => i.image_large_url);

    if (!images.length)
      return conn.reply(
        m.chat,
        `🍃 No pude encontrar imágenes… quizá intenta con otra palabra, senpai.`,
        m
      );

    await m.react("🍥");

    for (let i = 0; i < images.length; i++) {
      await conn.sendMessage(
        m.chat,
        {
          image: { url: images[i] },
          caption: `🍥 *Imagen ${i + 1} de 10*\n🔎 Resultado de: *${text}*\n\n© Powered by Danielrxz 👾`
        },
        { quoted: m }
      );
    }

    await m.react("✨");
  } catch (e) {
    console.error(e);
    m.react("✖️");
    return conn.reply(
      m.chat,
      `⚠️ *Ups... algo salió mal*  
🍃 Tal vez Pinterest está dormido, inténtalo de nuevo.`,
      m
    );
  }
};

handler.help = ["pinterest", "pin"];
handler.tags = ["dow"];
handler.command = ["pinterest", "pin"];

export default handler;