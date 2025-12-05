import fs from 'fs';
import path from 'path';
import { jidDecode } from '@whiskeysockets/baileys';

let handler = async (m, { conn, prefa, msgglobal }) => {
  const rawId = conn.user?.id || '';
  const decoded = jidDecode(rawId);
  const cleanId = decoded?.user || rawId.split('@')[0];

  const sessionTypes = ['session-sub'];
  const basePath = 'sessions';

  const sessionPath = sessionTypes
    .map(type => path.join(basePath, type, cleanId))
    .find(p => fs.existsSync(p));

  if (!sessionPath) {
    return m.reply('🫟 Este comando solo puede ser usado desde una instancia de Sub-Bot.');
  }

  try {
    await m.reply('🌱 Cerrando sesión del Socket...');

    await conn.logout();

    setTimeout(() => {
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        console.log(`🫟 Sesión de ${cleanId} eliminada de ${sessionPath}`);
      }
    }, 2000);

    setTimeout(() => {
     m.reply(`🕸 Sessión cerrada.`);
    }, 3000);
  } catch (err) {
    console.error(err);
    await m.reply('🐼 Error.');
  }
};

handler.help = ['logout'];
handler.tags = ['jadibot'];
handler.command = ['logout'];

export default handler;