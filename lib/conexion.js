// Código básico by: Danielrxz👾

import { 
  DisconnectReason, 
  useMultiFileAuthState, 
  fetchLatestBaileysVersion, 
  makeCacheableSignalKeyStore, 
  jidNormalizedUser
} from '@whiskeysockets/baileys';
import fs from 'fs';
import chalk from 'chalk';
import pino from 'pino';
import path from 'path';
import { fileURLToPath } from 'url';
import { makeWASocket } from './simple.js';
import store from './store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JADIBTS_DIR = path.join(__dirname, `../${jadi}`);

globalThis.conns = globalThis.conns || [];

export async function startSub() {
    if (!fs.existsSync(JADIBTS_DIR)) {
      return;
    }

    const subBotDirs = fs.readdirSync(JADIBTS_DIR);
    for (const dir of subBotDirs) {
      await startSubBotIfValid(dir);
    }
}

async function startSubBotIfValid(subBotDir) {
    const credsPath = path.join(JADIBTS_DIR, subBotDir, "creds.json");
    if (!fs.existsSync(credsPath)) {
      return;
    }

    const credsData = fs.readFileSync(credsPath, 'utf-8');
    const creds = JSON.parse(credsData);

    if (creds.fstop) {
      return;
    }

    await startSubBot(subBotDir, credsData);
}

async function startSubBot(subBotDir, credsData) {
    const subBotPath = path.join(JADIBTS_DIR, subBotDir);
    const { state, saveState, saveCreds } = await useMultiFileAuthState(subBotPath);

    const cacheableKeyStore = makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }));

    const { version } = await fetchLatestBaileysVersion();

    const socketOptions = {
      printQRInTerminal: false,
      auth: { creds: state.creds, keys: cacheableKeyStore },
      logger: pino({ level: "silent" }),
      browser: ['Windows', 'Firefox'],
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      syncFullHistory: false,
      keepAliveIntervalMs: 50000,
      getMessage: async (msg) => {
        try {
          const userJid = jidNormalizedUser(msg.remoteJid);
          const loadedMsg = await store.loadMessage(userJid, msg.id);
          return loadedMsg?.message || '';
        } catch {
          return '';
        }
      },
      msgRetryCounterMap: {},
      version
    };

    let socket = makeWASocket(socketOptions);
    socket.isInit = false;
    socket.uptime = Date.now();

    socket.ev.on("connection.update", (update) => handleConnectionUpdate(socket, update, subBotDir));
    socket.ev.on("creds.update", saveCreds);

    setInterval(async () => {
      if (!socket.user) {
        try {
          const wsState = socket?.ws?.socket?.readyState;
          const isConnected = wsState === 1;
          
          if (!isConnected) {
            console.log(`${chalk.yellow(`[ ⚠️  ]  ${subBotDir} sin conexión activa, limpiando...`)}`);
            socket.ws.close();
            socket.ev.removeAllListeners();
            const index = globalThis.conns.indexOf(socket);
            if (index >= 0) {
              globalThis.conns.splice(index, 1);
            }
          }
        } catch {}
      }
    }, 120000);  // Check every 2 minutes

    await loadHandler(socket);
    globalThis.conns.push(socket);
    socket.uptime = Date.now();
}

async function handleConnectionUpdate(socket, update, subBotDir) {
  const { connection, lastDisconnect, isNewLogin, qr } = update;

  if (isNewLogin) { 
    socket.isInit = false; 
  }

  if (connection === "close") {
    await handleDisconnect(lastDisconnect, socket, subBotDir);
  } else if (connection === "open") {
    socket.isInit = true;
    socket.uptime = Date.now();
    const botDir = subBotDir + '@s.whatsapp.net';
    console.log(`${chalk.gray(`[ 🌱  ]  ${subBotDir} conectado correctamente`)}`);
  }
}

async function handleDisconnect(lastDisconnect, socket, subBotDir) {
  const reason = lastDisconnect?.error?.output?.statusCode;
  const disconnectReason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

  if (reason === DisconnectReason.badSession) {
fs.rmdirSync(path.join(JADIBTS_DIR, subBotDir), { recursive: true });
  } else if (reason === 404 || reason === 403 || reason === 405 || reason === 401 || DisconnectReason === DisconnectReason.loggedOut) {
    console.log(`${chalk.gray(`[ 🌿  ]  Conexión cerrada para ${subBotDir}, se eliminará la sesión.`)}`);
    fs.rmdirSync(path.join(JADIBTS_DIR, subBotDir), { recursive: true });
  } else if (reason === 428 || disconnectReason === DisconnectReason.timedOut || disconnectReason === DisconnectReason.connectionClosed || disconnectReason === DisconnectReason.connectionLost) {
      console.log(`\n${chalk.gray(`[ 🌾  ]  Intentando reconectar a ${subBotDir}...`)}`);
      await restartSubBot(socket, subBotDir);
  } else if (reason === 440) {
    console.log(`\n${chalk.gray(`[ 🌱  ]  La conexión de ${subBotDir} ha sido reemplazada por otra sesión activa.`)}`);
  } else if (reason === 408) {
    console.log(`\n${chalk.gray(`[ 🪴  ]  Intentando reconectar a ${subBotDir}.`)}`);
    await restartSubBot(socket, subBotDir);
    } else {
    console.log(`${chalk.gray(`[ 🧋  ]  ${subBotDir} › ${reason}, No se reiniciara el Socket.`)}`);
    await restartSubBot(socket, subBotDir);
  }
}

async function restartSubBot(socket, subBotDir) {
  let credsPath = path.join(JADIBTS_DIR, subBotDir, "creds.json");
  const credsData = fs.readFileSync(credsPath, 'utf-8');

  await startSubBot(subBotDir, credsData).catch(() => {
fs.rmdirSync(path.join(JADIBTS_DIR, subBotDir), { recursive: true });
  });
}

async function loadHandler(socket) {
  const handlerPath = path.join(__dirname, "../handler.js");
  try {
    const handlerModule = await import(handlerPath + '?update=' + Date.now());
    if (handlerModule) {
      socket.handler = handlerModule.handler.bind(socket);
      socket.ev.on("messages.upsert", socket.handler);
    }
  } catch (error) {
    console.error(`Error en el handler:`, error);
  }
}