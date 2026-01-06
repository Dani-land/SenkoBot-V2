<p align="center">
  <img src="https://files.catbox.moe/tl3ey1.jpg" alt="Banner de Senko AI" width="600"/>
</p>

<h1 align="center">✦ Senko AI | Bot Multifuncional de WhatsApp ✦</h1>

---

### ⚙️ Características Clave

**Senko AI** es un bot de WhatsApp de alto rendimiento, construido sobre **Baileys**. Nuestro enfoque es ofrecer **velocidad**, **estabilidad** y una suite completa de herramientas esenciales para cualquier administrador o usuario.

<details>
 <summary><b>❕️ Funcionalidades Principales</b></summary>

| Categoría | Descripción | Estado |
| :--- | :--- | :---: |
| **Interacción** | Voz, Texto y Procesamiento de comandos avanzados. | ✅ |
| **Administración** | Configuración de grupos, Antilink, Alertas, Bienvenidas. | ✅ |
| **Multimedia** | Creación de Sticker (Imagen/Video/GIF), Buscador, Descargas (Música/Video de YT). | ✅ |
| **Entretenimiento** | Juegos, Gacha, Juego RPG. | ✅ |
| **Despliegue** | Soporte para SubBot (Jadibot). | ✅ |
| **Futuras** | Otras funciones en desarrollo. | 🛠️ |

> ⚠️ **Nota Importante:** El bot está en desarrollo activo. Si encuentras algún fallo o comportamiento inesperado, por favor repórtalo inmediatamente al creador para una solución óptima.
</details>

---

### 📲 Instalación Rápida con Termux

La forma más sencilla de ejecutar **Senko AI** en tu dispositivo Android es usando Termux.

#### **1. Descarga de Termux**
Haz click en la imagen para descargar la versión compatible:

<p align="center">
  <a href="https://www.mediafire.com/file/llugt4zgj7g3n3u/com.termux_1020.apk/file">
    <img src="https://qu.ax/finc.jpg" alt="Descargar Termux" height="100px">
  </a> 
</p>

#### **2. Comandos de Instalación (Paso a Paso)**

<details>
 <summary><b> ✍️ Click para ver los Comandos de Instalación Manual</b></summary>

> **Nota:** Copia y pega cada línea de comandos en Termux y ejecútala.

```bash
# 1. Configurar almacenamiento
termux-setup-storage

# 2. Actualizar paquetes e instalar dependencias esenciales
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn

# 3. Clonar el repositorio y navegar al directorio
git clone [https://github.com/Dani-land/SenkoBot-V2](https://github.com/Dani-land/SenkoBot-V2) && cd SenkoBot-V2

# 4. Instalar dependencias del proyecto
yarn install

# 5. Instalar dependencias con npm (opcional, recomendado)
npm install

# 6. Asegurar la última versión de las dependencias
npm update

# 7. Iniciar el Bot
npm start

> 🔔 Si durante la instalación Termux pregunta (Y/I/N/O/D/Z) [default=N] ?, usa la letra "y" seguida de ENTER para aprobar los cambios y continuar.
> 
</details>
🛠️ Solución de Problemas y Configuración
<details>
<summary><b> ⚡️ Gestión del Bot y Owner</b></summary>
Activar en caso de Detenerse (Termux)
Si el bot deja de responder (pantalla en blanco, desconexión), usa estos comandos para reiniciarlo:
# 1. Navegar al directorio del Bot
cd SenkoBot-V2

# 2. Iniciar el Bot nuevamente
npm start

Volverte Owner del Bot
Para añadir tu número a la lista de propietarios (Owner) y acceder a comandos administrativos, edita el archivo settings.js:
cd SenkoBot-V2 && nano settings.js

</details>
🌐 Conéctate con la Comunidad
| Contacto | Descripción | Enlace |
|---|---|---|
| Canal Oficial | Noticias y actualizaciones del Bot. | ¡Click aquí! |
| Grupo Oficial | Soporte y comunidad activa. | ¡Click aquí! |
| Comunidad | Grupo de interacción general. | ¡Click aquí! |
| WhatsApp Personal | Contacto directo con el creador. | Aquí |
| Gmail | Correo electrónico de contacto. | danielrodigome@gmail.com |

