# Development Guide 🛠️

This guide helps developers set up ChezFlora for local development.

## Prerequisites

- **Node.js**: Version 20.12.0 or higher
- **npm**: Comes with Node.js
- **Yarn**: Will be installed automatically by the setup script
- **Git**: For version control

## Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
git clone https://github.com/DimitriTedom/ChezFlora.git
cd ChezFlora
./setup.sh
```

### Option 2: Manual Setup
```bash
# 1. Clone the repository
git clone https://github.com/DimitriTedom/ChezFlora.git
cd ChezFlora

# 2. Install Yarn globally
npm install -g yarn

# 3. Install server dependencies
cd Server
yarn install

# 4. Install client dependencies  
cd ../client
npm install

# 5. Setup environment files
cp Server/.env.example Server/.env
cp client/.env.example client/.env

# 6. Edit environment files with your values
```

## Project Structure

```
ChezFlora/
├── client/          # React frontend (Vite)
├── Server/          # Express.js backend
├── setup.sh         # Automated setup script
├── package.json     # Root package with convenience scripts
└── README.md        # Main documentation
```

## Development Workflow

### Starting Development Servers

**Option 1: Start both servers simultaneously**
```bash
npm run dev
```

**Option 2: Start servers separately**
```bash
# Terminal 1 - Backend
cd Server
yarn dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

### Available Scripts

From the root directory:
- `npm run dev` - Start both client and server
- `npm run dev:client` - Start only client
- `npm run dev:server` - Start only server
- `npm run build` - Build both client and server
- `npm run install:all` - Install all dependencies

## Common Issues & Solutions

### 1. Port Already in Use
If you get "Port already in use" errors:
```bash
# Check what's using the port
lsof -i :5000  # for server
lsof -i :5173  # for client

# Kill the process
kill -9 <PID>
```

### 2. Dependency Conflicts
The project uses `.npmrc` to handle peer dependency warnings. If you encounter issues:
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

### 3. Environment Variables
Make sure you've copied and configured your environment files:
- `Server/.env` - Backend configuration
- `client/.env` - Frontend configuration

### 4. Database Connection
If using MongoDB, ensure it's running:
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or start local MongoDB service
sudo service mongodb start
```

## Technology Stack

### Frontend (Client)
- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Radix UI** - Component library

### Backend (Server)
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **MongoDB** - Database
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **PayPal SDK** - Payment processing

## API Documentation

When the server is running, API documentation is available at:
http://localhost:5000/api-docs

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test locally
5. Commit: `git commit -m "Add your feature"`
6. Push: `git push origin feature/your-feature`
7. Create a Pull Request

## Troubleshooting

### Clear All Dependencies
If you're having persistent issues:
```bash
# Clean everything
rm -rf client/node_modules client/package-lock.json
rm -rf Server/node_modules Server/yarn.lock
rm -rf node_modules package-lock.json

# Reinstall
./setup.sh
```

### Reset to Clean State
```bash
git clean -fdx
git reset --hard HEAD
./setup.sh
```

## Need Help?

- Check existing [Issues](https://github.com/DimitriTedom/ChezFlora/issues)
- Create a new issue with:
  - Your OS and Node.js version
  - Complete error message
  - Steps to reproduce

---

Happy coding! 🌸