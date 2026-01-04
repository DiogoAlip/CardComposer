# CardComposer

## About the Project

**CardComposer** is an interactive web application designed for composing and visualizing card manipulation routines or sequences. The tool allows users to create visual "programs" using a drag-and-drop interface, combining functions such as flipping cards, swapping them, or changing their state (face up/face down).

The project is built using a modern stack that includes:
- **React 19 & React Router v7**: For robust architecture and efficient rendering.
- **TypeScript**: To ensure type safety and improve the development experience.
- **Tailwind CSS v4**: For a stylish, responsive, and maintainable design.
- **@dnd-kit**: To manage complex drag-and-drop interactions.
- **Zustand**: For lightweight and powerful global state management.

## Project Installation

Follow these steps to install and run the project in your local environment:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system. It is recommended to use a package manager like `pnpm`, although `npm` will also work.

### 2. Clone the Repository
Open your terminal and clone the project:

```bash
git clone <REPOSITORY_URL>
cd CardComposer
```

### 3. Install Dependencies
Install the necessary libraries. We recommend using `pnpm` as the project contains a `pnpm-lock.yaml` file:

```bash
pnpm install
```
*If you prefer to use npm:*
```bash
npm install
```

### 4. Start the Development Server
Run the following command to start the application in development mode:

```bash
pnpm dev
```
*Or with npm:*
```bash
npm run dev
```

### 5. Open the Application
Once the server has started, you will see a URL in the terminal (usually `http://localhost:5173`). Open it in your browser to see the application running.

---

## Other Scripts

- **Build for production**: `npm run build` or `pnpm build`
- **Preview production**: `npm run start` or `pnpm start`
