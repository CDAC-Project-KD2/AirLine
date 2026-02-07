# Airline Frontend - FlyMate

A modern React-based airline booking system frontend built with Vite, Redux Toolkit, and Bootstrap.

## Features

- **User Authentication**: Login, Register, Forgot Password
- **Role-based Access**: Admin, Staff, and Passenger dashboards
- **Flight Management**: Search, book, and manage flights
- **Booking System**: Complete booking workflow with payment integration
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **State Management**: Redux Toolkit for efficient state management

## Tech Stack

- **Frontend**: React 19, Vite 7
- **Routing**: React Router DOM 7
- **State Management**: Redux Toolkit, React Redux
- **UI Framework**: React Bootstrap, Bootstrap 5
- **HTTP Client**: Axios
- **Authentication**: JWT with jwt-decode
- **Notifications**: React Toastify

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd airline_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Admin/          # Admin dashboard components
│   ├── common/         # Shared components (Navbar, Footer, etc.)
│   ├── Layouts/        # Layout components
│   ├── passenger/      # Passenger dashboard components
│   ├── redux/          # Redux store and slices
│   └── staff/          # Staff dashboard components
├── assets/             # Images and static files
├── data/              # Mock data
├── App.jsx            # Main App component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## API Integration

The frontend is configured to work with a Spring Boot backend running on `http://localhost:8080`. Make sure your backend server is running before using the application.

## User Roles

1. **Admin**: Manage flights, staff, routes, and view reports
2. **Staff**: Manage flight status, passenger check-in, and assist with cancellations
3. **Passenger**: Search flights, make bookings, manage profile, and view booking history

## Build and Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a CDAC final project and is for educational purposes.