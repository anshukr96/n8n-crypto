# Trading n8n Automation

A powerful crypto trading automation platform built with a modern monorepo architecture. This project allows users to create visual workflows to automate cryptocurrency trading strategies.

## 🚀 Features

- **Visual Workflow Builder**: Create complex trading strategies using a drag-and-drop interface (powered by React Flow).
- **Automated Execution**: Dedicated executor service to run your workflows reliably.
- **Crypto Integration**: Built-in support for major exchanges (Hyperliquid, Backpack, Lighter).
- **Secure Authentication**: JWT-based user authentication.
- **Monorepo Structure**: Efficient code sharing and build times using Turborepo.

## 🛠️ Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Backend**: [Express](https://expressjs.com/), [Node.js](https://nodejs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```
├── apps
│   ├── client      # React frontend application
│   ├── backend     # Express API server
│   └── executor    # Workflow execution service
└── packages
    ├── db          # Shared Mongoose schemas and database client
    ├── common      # Shared types and utilities
    ├── eslint-config # Shared ESLint configuration
    └── typescript-config # Shared TS configuration
```

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [Bun](https://bun.sh/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd trading-n8n-turborepo
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Set up environment variables:**

   You need to configure environment variables for each application. Check the `.env.example` files in each app directory.

   **Backend (`apps/backend/.env`):**
   ```env
   JWT_SECRET=your_jwt_secret
   MONGO_URL=mongodb://localhost:27017/your_database
   PORT=3000
   ```

   **Executor (`apps/executor/.env`):**
   ```env
   MONGO_URL=mongodb://localhost:27017/your_database
   ```

   **Client (`apps/client/.env`):**
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running the Project

To start all applications (client, backend, executor) in development mode:

```bash
bun run dev
```

Or using Turbo directly:

```bash
turbo run dev
```

### Building

To build all apps and packages:

```bash
bun run build
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

[MIT](LICENSE)
