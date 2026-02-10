#!/bin/bash

# Backend API Test Script
echo "Testing Airline Backend API..."

BASE_URL="http://localhost:8080"

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s "$BASE_URL/actuator/health" | jq '.' || echo "Health check failed"

# Test 2: Get All Flights (Public endpoint)
echo -e "\n2. Testing Get All Flights..."
curl -s "$BASE_URL/api/flights" | jq '.' || echo "Get flights failed"

# Test 3: Search Flights
echo -e "\n3. Testing Flight Search..."
curl -s "$BASE_URL/api/flights/search?from=Mumbai&to=Delhi" | jq '.' || echo "Flight search failed"

# Test 4: Register User
echo -e "\n4. Testing User Registration..."
curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }' | jq '.' || echo "Registration failed"

# Test 5: Login User
echo -e "\n5. Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@airline.com",
    "password": "admin123"
  }')

echo $LOGIN_RESPONSE | jq '.'

# Extract token for authenticated requests
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
  echo -e "\n6. Testing Authenticated Request (Get Bookings)..."
  curl -s "$BASE_URL/api/bookings" \
    -H "Authorization: Bearer $TOKEN" | jq '.' || echo "Authenticated request failed"
else
  echo "Login failed, skipping authenticated tests"
fi

echo -e "\nAPI Testing Complete!"