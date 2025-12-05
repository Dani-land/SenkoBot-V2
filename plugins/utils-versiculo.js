import fetch from "node-fetch";

const handler = async (m, { conn }) => {
  try {
    // Llamada a la API pública para obtener un versículo aleatorio en español
    const res = await fetch("https://plvictor.com/api/bible/random?version=nvi");
    if (!res.ok) throw new Error("API responded with " + res.status);
    const json = await res.json();
    if (!json.success || !json.data) throw new Error("Invalid API response");

    const verse = json.data; // estructura depende de la API
    // Suponiendo que json.data contiene: { book, chapter, verse, text }
    const { book, chapter, verse: numVerse, text } = verse;

    const message = `
📖 *Versículo al azar*  
📚 ${book} ${chapter}:${numVerse}

> "${text}"

✨ Que tengas un buen día, bro 🌸
    `.trim();

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });
  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: "✝️ Lo siento, no pude obtener un versículo. Intenta de nuevo más tarde." }, { quoted: m });
  }
};

handler.command = ["versiculo", "versículo", "biblia"];
handler.tags = ["religion"];
handler.help = ["versículo"];

export default handler;