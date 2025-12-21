// Código creado por Danielrxz

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CLAIM_DB_PATH = path.join(__dirname, '../claim-db.json')

export function loadClaimDB() {
  try {
    if (fs.existsSync(CLAIM_DB_PATH)) {
      const data = fs.readFileSync(CLAIM_DB_PATH, 'utf8')
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('Error loading claim DB:', e)
  }
  return {}
}

export function saveClaimDB(db) {
  try {
    fs.writeFileSync(CLAIM_DB_PATH, JSON.stringify(db, null, 2))
  } catch (e) {
    console.error('Error saving claim DB:', e)
  }
}

global.claim = {
  enabled: true,
  limit: 1,
  cooldown: 3 * 60 * 60 * 1000,

  messages: {
    success: "✨ ¡Yay! Has reclamado tu recompensa kawaii ✨",
    cooldown: "⏳ Aún no puedes reclamar, espera un poquito más uwu!",
    disabled: "❌ Los reclamos están desactivados temporalmente nyaa~",
  },

  emoji: "🌸",
}
