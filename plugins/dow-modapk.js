import fetch from "node-fetch";

const handler = async (m, { conn, text, command }) => {
  if (!text)
    return conn.reply(m.chat, `📦 *Dime el nombre o link de Aptoide*\n\nEjemplo:\n.apk whatsapp\n.apk https://m.aptoide.com/app`, m);

  try {
    let query = encodeURIComponent(text);
    let url = `https://api.dorratz.com/v2/apk-dl?query=${query}`;

    await conn.reply(m.chat, "⏳ *Buscando APK... espera bro*", m);

    let res = await fetch(url);
    let json = await res.json();

    if (!json.status || !json.data)
      return conn.reply(m.chat, "❌ No se encontró la app.", m);

    let app = json.data;
    let name = app.name || "App";
    let version = app.version || "N/A";
    let size = app.size || "N/A";
    let link = app.download || null;

    if (!link)
      return conn.reply(m.chat, "❌ No hay enlace de descarga.", m);

    // Información de la app
    let info = `
📦 *${name}*
🧩 Versión: *${version}*
📁 Tamaño: *${size}*

⬇ *Descargando APK...*
    `;

    await conn.reply(m.chat, info, m);

    // Enviar APK al chat
    await conn.sendMessage(m.chat, {
      document: { url: link },
      mimetype: "application/vnd.android.package-archive",
      fileName: `${name}.apk`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "⚠️ Error al descargar el APK.", m);
  }
};

handler.command = ["apk", "aptoide", "apkdl"];
handler.help = ["apk", "aptoide", "apkdl"];
handler.tags = ["dow"];

handler.group = true

export default handler;