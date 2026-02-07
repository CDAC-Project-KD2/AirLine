# Airline Backend - Spring Boot REST API

A comprehensive airline reservation system backend built with Spring Boot, providing REST APIs for flight booking, user management, and administrative operations.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Flight Management**: CRUD operations for flights, routes, and aircraft
- **Booking System**: Complete booking workflow with status management
- **User Management**: Admin, Staff, and Passenger role management
- **Search Functionality**: Advanced flight search with multiple criteria
- **Database Integration**: MySQL database with JPA/Hibernate
- **API Documentation**: Swagger/OpenAPI integration
- **Security**: Spring Security with CORS support

## Tech Stack

- **Framework**: Spring Boot 3.5.9
- **Database**: MySQL 8.0+
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security with JWT
- **Documentation**: SpringDoc OpenAPI (Swagger)
- **Build Tool**: Maven
- **Java Version**: 21

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Database Setup

1. Install MySQL and create a database:
   ```sql
   CREATE DATABASE airline;
   ```

2. Update database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## Installation & Setup

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd "Airline 2"
   ```

2. Install dependencies:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

4. The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/search` - Search flights
- `GET /api/flights/{id}` - Get flight by ID
- `POST /api/flights` - Create flight (Admin)
- `PUT /api/flights/{id}` - Update flight (Admin)
- `DELETE /api/flights/{id}` - Delete flight (Admin)
- `PATCH /api/flights/{id}/status` - Update flight status (Staff)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (Admin)
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}/cancel` - Cancel booking

### Search
- `GET /api/search/flights` - Search flights with filters
- `GET /api/search/destinations` - Get popular destinations

### Users
- `GET /api/users` - Get all users (Admin)
- `POST /api/users` - Create user (Admin)

## Sample Data

The application automatically initializes with sample data including:

### Users
- **Admin**: admin@airline.com / admin123
- **Staff**: staff@airline.com / staff123
- **Passenger**: john@example.com / user123

### Airports
- Mumbai (BOM) - Chhatrapati Shivaji Maharaj International Airport
- Delhi (DEL) - Indira Gandhi International Airport
- Bangalore (BLR) - Kempegowda International Airport

### Sample Flights
- AI101: Mumbai to Delhi
- AI102: Delhi to Bangalore

## API Documentation

Once the application is running, access the Swagger UI at:
- **Swagger UI**: http://localhost:8080/swagger-ui/index.html
- **API Docs**: http://localhost:8080/v3/api-docs

## Configuration

### CORS Configuration
The backend is configured to accept requests from:
- http://localhost:3000 (React development server)
- http://localhost:5173 (Vite development server)

### JWT Configuration
- Secret key is configured in application.properties
- Token expiration: 24 hours (86400000 ms)

### Database Configuration
- Auto-creates database if it doesn't exist
- Uses Hibernate DDL auto-update
- Shows SQL queries in development

## Project Structure

```
src/main/java/com/airline/
├── config/          # Configuration classes
├── controller/      # REST controllers
├── dto/            # Data Transfer Objects
├── entity/         # JPA entities
├── exception/      # Exception handling
├── repository/     # Data repositories
├── security/       # Security configuration
└── service/        # Business logic services
```

## Entity Relationships

- **User** → **Booking** (One-to-Many)
- **Flight** → **Booking** (One-to-Many)
- **Route** → **Flight** (One-to-Many)
- **Aircraft** → **Flight** (One-to-Many)
- **Airport** → **Route** (Many-to-One for source/destination)

## Testing

Run tests with:
```bash
mvn test
```

## Building for Production

1. Build the JAR file:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/spring_boot_backend_template-0.0.1.jar
   ```

## Environment Variables

For production deployment, set these environment variables:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `APP_JWT_SECRET`

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials
   - Verify database exists

2. **Port Already in Use**
   - Change port in application.properties: `server.port=8081`

3. **CORS Issues**
   - Verify frontend URL in CORS configuration
   - Check if both CorsConfig and SecurityConfig are properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is part of a CDAC final project and is for educational purposes.