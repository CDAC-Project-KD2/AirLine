import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom"

import Home from './components/common/Home'
import Login from './components/common/Login'
import Register from './components/common/Register'
import ForgotPassword from './components/common/ForgotPassword'
import Logout from './components/common/Logout'
import AdminLayout from './components/Layouts/AdminLayout'
import AdminDashboard from './components/Admin/AdminDashboard'
import StaffList from './components/Admin/staff/StaffList'
import AddStaff from './components/Admin/staff/AddStaff'
import EditStaff from './components/Admin/staff/EditStaff'
import FlightList from './components/Admin/flight/FlightList'
import AddFlight from './components/Admin/flight/AddFlight'
import EditFlight from './components/Admin/flight/EditFlight'
import RouteList from './components/Admin/routes/RouteList'
import AddRoute from './components/Admin/routes/AddRoute'
import EditRoute from './components/Admin/routes/EditRoute'
import BookingList from './components/Admin/bookings/BookingList'
import BookingDetails from './components/Admin/bookings/BookingDetails'
import Reports from './components/Admin/Reports'
import PassengerLayout from './components/Layouts/PassengerLayout'
import PassengerDashboard from './components/passenger/PassengerDashboard'
import SearchFlights from './components/passenger/SearchFlight'
import AvailableFlights from './components/passenger/AvailableFlights'
import BookingForm from './components/passenger/BookingForm'
import BookingConfirmation from './components/passenger/BookingConfirmation'
import MyBookings from './components/passenger/MyBooking'
import Profile from './components/passenger/Profile'
import TransactionHistory from './components/passenger/TransactionHistory'
import About from './components/common/About'
import Contact from './components/common/Contact'
import Payment from './components/passenger/Payment'
import PaymentStatus from './components/passenger/PaymentStatus'
import StaffLayout from './components/Layouts/StaffLayout'
import StaffDashboard from './components/staff/StaffDashboard'
import FlightSchedule from './components/staff/FlightSchedule'
import FlightDetails from './components/staff/FlightDetails'
import UpdateFlightStatus from './components/staff/UpdateFlightStatus'
import PassengerList from './components/staff/PassengerList'
import CheckIn from './components/staff/CheckIn'
import AssistCancellation from './components/staff/AssistCancellation'
import Unauthorized from './components/common/Unauthorized'
import Destinations from './components/common/Destination'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/destinations" element={<Destinations />} />

      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="staff" element={<StaffList />} />
        <Route path="staff/add" element={<AddStaff />} />
        <Route path="staff/edit/:id" element={<EditStaff />} />
        <Route path="flights" element={<FlightList />} />
        <Route path="flights/add" element={<AddFlight />} />
        <Route path="flights/edit/:id" element={<EditFlight />} />
        <Route path="routes" element={<RouteList />} />
        <Route path="routes/add" element={<AddRoute />} />
        <Route path="routes/edit/:id" element={<EditRoute />} />
        <Route path="bookings" element={<BookingList />} />
        <Route path="bookings/:id" element={<BookingDetails />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="/passenger" element={<Navigate to="/passenger/dashboard" replace />} />
      <Route path="/passenger/*" element={<PassengerLayout />}>
        <Route path="dashboard" element={<PassengerDashboard />} />
        <Route path="search-flights" element={<SearchFlights />} />
        <Route path="available-flights" element={<AvailableFlights />} />
        <Route path="book" element={<BookingForm />} />
        <Route path="confirmation" element={<BookingConfirmation />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="transactions" element={<TransactionHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<Payment />} />
        <Route path="payment-status" element={<PaymentStatus />} />
      </Route>

      <Route path="/staff" element={<Navigate to="/staff/dashboard" replace />} />
      <Route path="/staff/*" element={<StaffLayout />}>
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="schedule" element={<FlightSchedule />} />
        <Route path="flight-details" element={<FlightDetails />} />
        <Route path="update-status" element={<UpdateFlightStatus />} />
        <Route path="passengers" element={<PassengerList />} />
        <Route path="checkin" element={<CheckIn />} />
        <Route path="cancellations" element={<AssistCancellation />} />
      </Route>
    </Routes>
  )
}

export default App
