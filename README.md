# README.md

# Flight Status and Notification System

A full-stack application that provides passengers with real-time flight status updates and notifications. The system simulates how airlines notify users about important flight events such as delays, cancellations, gate changes, boarding, and departures.

## Features

### Passenger Features

* View all flights
* Flight details page
* Subscribe to flight updates
* Real-time flight status updates using Socket.IO
* Real-time notifications
* Notification history
* Responsive design (mobile and desktop)

### Admin Features

* Admin dashboard
* Change flight status from UI
* Trigger:

  * On Time
  * Delayed
  * Cancelled
  * Boarding
  * Departed
* Instantly notify subscribed passengers

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Socket.IO Client
* Axios

### Backend

* Node.js
* Express.js
* Socket.IO
* Mongoose

### Database

* MongoDB

### Containerization

* Docker
* Docker Compose

## Running with Docker

```bash
docker compose up --build
```

Frontend:
http://localhost:5173
for admin its - http://localhost:5173/admin

Backend:
http://localhost:5000

## Restoring Demo Data

Demo MongoDB backup is included.

Restore using:

```bash
docker cp mongo-backup flight-mongodb:/backup
docker exec -it flight-mongodb mongorestore /backup
```

## API Endpoints


### Flights

* GET /api/flights
* GET /api/flights/:id
* POST /api/flights/:id/status

### Notifications

* GET /api/notifications/:userId
* PATCH /api/notifications/:id/read

### Subscriptions

* POST /api/subscriptions
* GET /api/subscriptions/:userId
* DELETE /api/subscriptions/:flightId

```
```
