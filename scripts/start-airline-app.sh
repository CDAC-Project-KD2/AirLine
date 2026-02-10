#!/bin/bash

# Airline Application Startup Script
echo "Starting Airline Reservation System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Check if MySQL is running
echo -e "${YELLOW}Checking MySQL connection...${NC}"
if ! mysql -u root -panant1030 -e "SELECT 1;" >/dev/null 2>&1; then
    echo -e "${RED}Error: MySQL is not running or credentials are incorrect${NC}"
    echo "Please start MySQL and ensure the credentials in application.properties are correct"
    exit 1
fi
echo -e "${GREEN}MySQL connection successful${NC}"

# Start Backend
echo -e "${YELLOW}Starting Backend (Spring Boot)...${NC}"
cd "Airline 2"

if check_port 8080; then
    echo -e "${YELLOW}Port 8080 is already in use. Stopping existing process...${NC}"
    pkill -f "spring-boot:run" 2>/dev/null || true
    sleep 2
fi

# Start backend in background
mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
echo "Waiting for backend to start..."
for i in {1..30}; do
    if check_port 8080; then
        echo -e "${GREEN}Backend started successfully on port 8080${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}Backend failed to start within 30 seconds${NC}"
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    sleep 1
done

# Start Frontend
cd "../airline_frontend "
echo -e "${YELLOW}Starting Frontend (React + Vite)...${NC}"

if check_port 3000; then
    echo -e "${YELLOW}Port 3000 is already in use. Stopping existing process...${NC}"
    pkill -f "vite" 2>/dev/null || true
    sleep 2
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Wait for frontend to start
echo "Waiting for frontend to start..."
for i in {1..20}; do
    if check_port 3000; then
        echo -e "${GREEN}Frontend started successfully on port 3000${NC}"
        break
    fi
    if [ $i -eq 20 ]; then
        echo -e "${RED}Frontend failed to start within 20 seconds${NC}"
        kill $FRONTEND_PID 2>/dev/null || true
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    sleep 1
done

echo -e "${GREEN}🎉 Airline Reservation System is now running!${NC}"
echo ""
echo -e "${YELLOW}Access URLs:${NC}"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8080"
echo "Swagger UI: http://localhost:8080/swagger-ui/index.html"
echo ""
echo -e "${YELLOW}Sample Login Credentials:${NC}"
echo "Admin: admin@airline.com / admin123"
echo "Staff: staff@airline.com / staff123"
echo "User: john@example.com / user123"
echo ""
echo -e "${YELLOW}Logs:${NC}"
echo "Backend log: Airline 2/backend.log"
echo "Frontend log: airline_frontend /frontend.log"
echo ""
echo "Press Ctrl+C to stop both services"

# Function to cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Stopping services...${NC}"
    kill $FRONTEND_PID 2>/dev/null || true
    kill $BACKEND_PID 2>/dev/null || true
    echo -e "${GREEN}Services stopped${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running
while true; do
    sleep 1
done