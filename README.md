# CardComposer

## Sobre qué trata el proyecto

**CardComposer** es una aplicación web interactiva diseñada para la composición y visualización de rutinas o secuencias de manipulación de cartas. La herramienta permite a los usuarios crear "programas" visuales mediante una interfaz de arrastrar y soltar (drag-and-drop), combinando funciones como voltear cartas, intercambiarlas o cambiar su estado (boca arriba/boca abajo).

El proyecto está construido utilizando un stack moderno que incluye:
- **React 19 & React Router v7**: Para una arquitectura robusta y renderizado eficiente.
- **TypeScript**: Para garantizar la seguridad de tipos y mejorar la experiencia de desarrollo.
- **Tailwind CSS v4**: Para un diseño estilizado, responsivo y mantenible.
- **@dnd-kit**: Para gestionar las interacciones complejas de arrastrar y soltar.
- **Zustand**: Para una gestión del estado global ligera y potente.

## Instalacion del proyecto

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu sistema. Se recomienda usar un gestor de paquetes como `pnpm`, aunque `npm` también funcionará.

### 2. Clonar el repositorio
Abre tu terminal y clona el proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd CardComposer
```

### 3. Instalar dependencias
Instala las librerías necesarias. Recomendamos usar `pnpm` ya que el proyecto contiene un archivo `pnpm-lock.yaml`:

```bash
pnpm install
```
*Si prefieres usar npm:*
```bash
npm install
```

### 4. Iniciar el servidor de desarrollo
Ejecuta el siguiente comando para iniciar la aplicación en modo desarrollo:

```bash
pnpm dev
```
*O con npm:*
```bash
npm run dev
```

### 5. Abrir la aplicación
Una vez iniciado el servidor, verás una URL en la terminal (normalmente `http://localhost:5173`). Ábrela en tu navegador para ver la aplicación funcionando.

---

## Otros Scripts

- **Construir para producción**: `npm run build` o `pnpm build`
- **Previsualizar producción**: `npm run start` o `pnpm start`
