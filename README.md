# CardComposer

## Project Structure

```
CardComposer/
├── client/              <-- React (Vite)
│   ├── src/
│   ├── package.json
│   └── ...
├── server/              <-- Node.js + Socket.IO
│   ├── index.js
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

---

## About the Project

**CardComposer** is an interactive web application designed for composing and visualizing card manipulation routines or sequences. The tool allows users to create visual "programs" using a drag-and-drop interface, combining functions such as flipping cards, swapping them, or changing their state (face up/face down).

The project is built using a modern stack:

- **Client**: React, Vite, TypeScript, Tailwind CSS v4, Zustand, @dnd-kit
- **Server**: Node.js, Express, Socket.IO

---

### Game Modes

#### Solo (vs-computer)

Challenge the Bot and demonstrate your mastery of functional programming. You can choose from three difficulty levels:

- **Easy**: The Bot plays unpredictably, choosing random functions and filters.
- **Normal**: The Bot plays strategically by simulating possible moves to maximize the score of its own hand.
- **Advanced**: The Bot anticipates the matchup, simulating moves to maximize its advantage against your hand.

#### Multiplayer

- **Invite Player**: Create a room and share an invitation code to challenge a friend via Socket.IO.
- **Join Game**: Enter an invitation code to join an existing lobby and face off against another player.

---

## Installation & Running

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Client Setup & Development

```bash
cd client
pnpm install # or npm install
pnpm dev     # or npm run dev
```

The client will start at `http://localhost:5173`.

### 3. Server Setup & Development

```bash
cd server
npm install
npm run dev # or npm start
```

The server will start at `http://localhost:3001`.
