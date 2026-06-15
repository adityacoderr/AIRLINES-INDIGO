# ARCHITECTURE.md

# System Architecture

Frontend (React)
↓
Axios + Socket.IO
↓
Backend (Express)
↓
Services Layer
↓
MongoDB

## Real-Time Flow

Admin Dashboard
↓
Update Flight Status API
↓
MongoDB Update
↓
Socket.IO Event Emission
↓
Passenger Dashboard Updates
↓
Notifications Generated
↓
Targeted Notification Delivery

## Components

### Frontend

* Dashboard
* Flight Details
* Notifications
* Admin Dashboard
* FlightTable
* FlightCard

### Backend

* Controllers
* Services
* Routes
* Models
* Socket Configuration

### Database Collections

* flights
* notifications
* subscriptions

## Docker Architecture

Frontend Container
↓
Backend Container
↓
MongoDB Container

```
```
