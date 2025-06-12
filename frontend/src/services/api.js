const BASE_URL = 'https://xplorease.onrender.com/api';

export const flightAPI = {
  searchFlights: async (searchParams) => {
    const response = await fetch(
      `${BASE_URL}/flights/search?from=${searchParams.from}&to=${searchParams.to}&date=${searchParams.date}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }
    return response.json();
  },

  getFlightById: async (flightId) => {
    const response = await fetch(`${BASE_URL}/flights/${flightId}`);
    if (!response.ok) {
      throw new Error('Flight not found');
    }
    return response.json();
  },

  createBooking: async (bookingData) => {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT token in localStorage
      },
      body: JSON.stringify(bookingData)
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return response.json();
  },

  getUserBookings: async () => {
    const response = await fetch(`${BASE_URL}/bookings/my-bookings`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    return response.json();
  },

  cancelBooking: async (bookingId) => {
    const response = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
    return response.json();
  }
};
