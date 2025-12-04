// 🌸 Kawaii Global Claim System 🌸
// Ahora cualquier comando puede usar: global.claim

global.claim = {
  enabled: true,
  limit: 1, // cuántos reclamos puede hacer el usuario
  cooldown: 3 * 60 * 60 * 1000, // 3 horas en ms

  messages: {
    success: "✨ ¡Yay! Has reclamado tu recompensa kawaii ✨",
    cooldown: "⏳ Aún no puedes reclamar, espera un poquito más uwu!",
    disabled: "❌ Los reclamos están desactivados temporalmente nyaa~",
  },

  emoji: "🌸",
};