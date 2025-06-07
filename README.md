[
  {
    "flightNumber": "AI202",
    "airline": "Air India",
    "origin": "Delhi",
    "destination": "Mumbai",
    "departureTime": "2025-06-08T09:00:00Z",
    "arrivalTime": "2025-06-08T11:00:00Z",
    "duration": "2h",
    "price": 4500,
    "stops": 0,
    "availableSeats": 120
  },
  {
    "flightNumber": "6E305",
    "airline": "IndiGo",
    "origin": "Bangalore",
    "destination": "Kolkata",
    "departureTime": "2025-06-09T13:30:00Z",
    "arrivalTime": "2025-06-09T16:30:00Z",
    "duration": "3h",
    "price": 5300,
    "stops": 0,
    "availableSeats": 85
  },
  {
    "flightNumber": "SG104",
    "airline": "SpiceJet",
    "origin": "Chennai",
    "destination": "Hyderabad",
    "departureTime": "2025-06-10T07:00:00Z",
    "arrivalTime": "2025-06-10T08:20:00Z",
    "duration": "1h 20m",
    "price": 3100,
    "stops": 0,
    "availableSeats": 45
  },
  {
    "flightNumber": "UK807",
    "airline": "Vistara",
    "origin": "Delhi",
    "destination": "Pune",
    "departureTime": "2025-06-11T18:00:00Z",
    "arrivalTime": "2025-06-11T20:30:00Z",
    "duration": "2h 30m",
    "price": 4900,
    "stops": 0,
    "availableSeats": 95
  },
  {
    "flightNumber": "G8105",
    "airline": "GoAir",
    "origin": "Ahmedabad",
    "destination": "Goa",
    "departureTime": "2025-06-12T14:45:00Z",
    "arrivalTime": "2025-06-12T17:15:00Z",
    "duration": "2h 30m",
    "price": 4200,
    "stops": 0,
    "availableSeats": 60
  }
]
/server
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── app.js
└── server.js

## 💻 Local Development Setup

```bash
# Clone the repo
git clone https://github.com/your-username/exploreease.git
cd exploreease

# Backend setup
cd server
npm install
npm run dev

# Frontend setup
cd client
npm install
npm run dev
