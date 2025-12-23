import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) return conn.reply(m.chat, `✿ Responde a una imagen, video u otro archivo`, m);

  await m.react('⏳');

  try {
    let media = await q.download();
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link = await catbox(media);

    let txt = `🌸 *C A T B O X  ~  M A G I C  U P L O A D E R* 🐱\n\n`;
    txt += `🎀 *Enlace mágico* : ${link}\n`;
    txt += `💾 *Tamañito* : ${formatBytes(media.length)}\n`;
    txt += `⏰ *Expiración* : ${isTele ? 'No expira nya~ 🐾' : 'Desconocido...'}\n\n`;
    txt += `✿ *Con amor: ${team}* ✿`;

    await conn.sendFile(m.chat, media, 'nyan.png', txt, m, fkontak);

    await m.react('✅');
  } catch {
    await m.react('❌');
    conn.reply(m.chat, '¡Nyaa~ algo salió mal! Intenta otra vez please 💔', m);
  }
};

handler.help = ['catbox', 'tourl2'];
handler.tags = ['cute-tools'];
handler.command = ['catbox', 'tourl2'];

export default handler;

function formatBytes(bytes) {
  if (bytes === 0) return '0 B nya~';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
  const formData = new FormData();
  const filename = crypto.randomBytes(5).toString("hex") + "." + ext;

  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, filename);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (UwU; Linux neko) AppleWebKit/Nya.36 (KHTML like Cat) Safari/nya~",
    },
  });

  return await response.text();
}