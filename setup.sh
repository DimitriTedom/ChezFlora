#!/bin/bash

# ChezFlora Setup Script
# This script automates the installation process for new contributors

echo "🌸 Welcome to ChezFlora Setup!"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.12.0 or higher."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="20.12.0"

if ! node -p "process.version.slice(1).split('.').map(Number).some((v, i) => v > '$REQUIRED_VERSION'.split('.').map(Number)[i] || (v === '$REQUIRED_VERSION'.split('.').map(Number)[i] && i === 2))" 2>/dev/null; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install version $REQUIRED_VERSION or higher."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Install Yarn if not present
if ! command -v yarn &> /dev/null; then
    echo "📦 Installing Yarn globally..."
    npm install -g yarn
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Yarn"
        exit 1
    fi
    echo "✅ Yarn installed successfully"
else
    echo "✅ Yarn already installed"
fi

# Install server dependencies
echo "🔧 Installing server dependencies..."
cd Server
yarn install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install server dependencies"
    exit 1
fi
echo "✅ Server dependencies installed"

# Install client dependencies
echo "🔧 Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install client dependencies"
    exit 1
fi
echo "✅ Client dependencies installed"

# Create environment files if they don't exist
echo "📝 Setting up environment files..."
cd ..

if [ ! -f "Server/.env" ]; then
    cp Server/.env.example Server/.env
    echo "✅ Created Server/.env from template"
    echo "⚠️  Please edit Server/.env with your configuration values"
else
    echo "✅ Server/.env already exists"
fi

if [ ! -f "client/.env" ]; then
    cp client/.env.example client/.env
    echo "✅ Created client/.env from template"
    echo "⚠️  Please edit client/.env with your configuration values"
else
    echo "✅ client/.env already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo "================================"
echo ""
echo "To start development:"
echo "1. Terminal 1 - Server:"
echo "   cd Server && yarn dev"
echo ""
echo "2. Terminal 2 - Client:"
echo "   cd client && npm run dev"
echo ""
echo "3. Open your browser:"
echo "   Frontend: http://localhost:5173/"
echo "   Backend:  http://localhost:5000/"
echo "   API Docs: http://localhost:5000/api-docs"
echo ""
echo "Happy coding! 🌸"