#!/bin/bash

# ChezFlora Health Check Script
# Validates that the project is properly set up

echo "🌸 ChezFlora Health Check"
echo "========================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
    else
        echo -e "${RED}❌ Node.js not found${NC}"
        return 1
    fi
}

check_yarn() {
    if command -v yarn &> /dev/null; then
        YARN_VERSION=$(yarn -v)
        echo -e "${GREEN}✅ Yarn: v$YARN_VERSION${NC}"
    else
        echo -e "${RED}❌ Yarn not found${NC}"
        return 1
    fi
}

check_dependencies() {
    echo "📦 Checking dependencies..."
    
    # Check server dependencies
    if [ -d "Server/node_modules" ]; then
        echo -e "${GREEN}✅ Server dependencies installed${NC}"
    else
        echo -e "${RED}❌ Server dependencies missing${NC}"
        return 1
    fi
    
    # Check client dependencies
    if [ -d "client/node_modules" ]; then
        echo -e "${GREEN}✅ Client dependencies installed${NC}"
    else
        echo -e "${RED}❌ Client dependencies missing${NC}"
        return 1
    fi
}

check_env_files() {
    echo "📝 Checking environment files..."
    
    if [ -f "Server/.env" ]; then
        echo -e "${GREEN}✅ Server .env exists${NC}"
    else
        echo -e "${YELLOW}⚠️  Server .env missing (copy from .env.example)${NC}"
    fi
    
    if [ -f "client/.env" ]; then
        echo -e "${GREEN}✅ Client .env exists${NC}"
    else
        echo -e "${YELLOW}⚠️  Client .env missing (copy from .env.example)${NC}"
    fi
}

check_ports() {
    echo "🔌 Checking ports..."
    
    if lsof -i:5000 &> /dev/null; then
        echo -e "${YELLOW}⚠️  Port 5000 is in use (server)${NC}"
    else
        echo -e "${GREEN}✅ Port 5000 available${NC}"
    fi
    
    if lsof -i:5173 &> /dev/null; then
        echo -e "${YELLOW}⚠️  Port 5173 is in use (client)${NC}"
    else
        echo -e "${GREEN}✅ Port 5173 available${NC}"
    fi
}

# Run checks
echo "🔍 Running health checks..."
echo ""

check_node
check_yarn
check_dependencies
check_env_files
check_ports

echo ""
echo "🎯 Quick Start Commands:"
echo "  npm run dev          # Start both servers"
echo "  npm run dev:server   # Start only server"
echo "  npm run dev:client   # Start only client"
echo ""

# Final status
if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Ready for development.${NC}"
else
    echo -e "${RED}❌ Some issues found. Run ./setup.sh to fix.${NC}"
    exit 1
fi