const Hotel = require('../models/hotelModel');
const User = require('../models/userModel');

exports.createHotels = async (req, res) => {
  try {
    const sampleHotels = [
        {
          name: 'Hotel Oasis',
          description: 'A luxurious resort in the heart of the city',
          price: 150,
          location: 'Downtown',
          amenities: ['Swimming pool', 'Spa', 'Gym', 'Free WiFi'],
          rooms: [
            { roomNumber: 101, roomType: 'Standard', capacity: 2 },
            { roomNumber: 102, roomType: 'Standard', capacity: 2 },
            { roomNumber: 201, roomType: 'Deluxe', capacity: 4 },
            { roomNumber: 202, roomType: 'Deluxe', capacity: 4 }
          ]
        },
        {
          name: 'Beachside Retreat',
          description: 'Relaxing getaway by the sea',
          price: 200,
          location: 'Coastal',
          amenities: ['Private beach', 'Water sports', 'Restaurant', 'Bar'],
          rooms: [
            { roomNumber: 301, roomType: 'Standard', capacity: 2 },
            { roomNumber: 302, roomType: 'Standard', capacity: 2 },
            { roomNumber: 401, roomType: 'Suite', capacity: 4 },
            { roomNumber: 402, roomType: 'Suite', capacity: 4 }
          ]
        },
        {
          name: 'Mountain Escape Lodge',
          description: 'A cozy retreat nestled in the mountains',
          price: 180,
          location: 'Mountain',
          amenities: ['Hiking trails', 'Restaurant', 'Fireplace', 'Free WiFi'],
          rooms: [
            { roomNumber: 501, roomType: 'Standard', capacity: 2 },
            { roomNumber: 502, roomType: 'Standard', capacity: 2 },
            { roomNumber: 601, roomType: 'Cabin', capacity: 4 },
            { roomNumber: 602, roomType: 'Cabin', capacity: 4 }
          ]
        },
        {
          name: 'City View Suites',
          description: 'Modern suites with panoramic city views',
          price: 220,
          location: 'Downtown',
          amenities: ['Sky lounge', 'Bar', 'Gym', 'Free WiFi'],
          rooms: [
            { roomNumber: 701, roomType: 'Standard', capacity: 2 },
            { roomNumber: 702, roomType: 'Standard', capacity: 2 },
            { roomNumber: 801, roomType: 'Executive Suite', capacity: 4 },
            { roomNumber: 802, roomType: 'Executive Suite', capacity: 4 }
          ]
        },
        {
          name: 'Countryside Inn',
          description: 'A peaceful retreat surrounded by nature',
          price: 130,
          location: 'Countryside',
          amenities: ['Organic restaurant', 'Hiking', 'Fishing', 'Free WiFi'],
          rooms: [
            { roomNumber: 901, roomType: 'Standard', capacity: 2 },
            { roomNumber: 902, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1001, roomType: 'Family Suite', capacity: 5 },
            { roomNumber: 1002, roomType: 'Family Suite', capacity: 5 }
          ]
        },
        {
          name: 'The Grand Palace',
          description: 'Elegant hotel with royal architecture',
          price: 350,
          location: 'City Center',
          amenities: ['Spa', 'Restaurant', 'Indoor pool', 'Free WiFi'],
          rooms: [
            { roomNumber: 1101, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1102, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1201, roomType: 'Luxury Suite', capacity: 4 },
            { roomNumber: 1202, roomType: 'Luxury Suite', capacity: 4 }
          ]
        },
        {
          name: 'Desert Mirage Resort',
          description: 'An oasis in the middle of the desert',
          price: 300,
          location: 'Desert',
          amenities: ['Infinity pool', 'Desert tours', 'Restaurant', 'Bar'],
          rooms: [
            { roomNumber: 1301, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1302, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1401, roomType: 'Villa', capacity: 6 },
            { roomNumber: 1402, roomType: 'Villa', capacity: 6 }
          ]
        },
        {
          name: 'Forest Retreat',
          description: 'Reconnect with nature in a secluded forest',
          price: 160,
          location: 'Forest',
          amenities: ['Nature walks', 'Organic café', 'Yoga classes', 'Free WiFi'],
          rooms: [
            { roomNumber: 1501, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1502, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1601, roomType: 'Treehouse', capacity: 4 },
            { roomNumber: 1602, roomType: 'Treehouse', capacity: 4 }
          ]
        },
        {
          name: 'Island Paradise Resort',
          description: 'A tropical island getaway with luxurious amenities',
          price: 450,
          location: 'Island',
          amenities: ['Private beach', 'Water activities', 'Spa', 'Luxury dining'],
          rooms: [
            { roomNumber: 1701, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1702, roomType: 'Standard', capacity: 2 },
            { roomNumber: 1801, roomType: 'Overwater Bungalow', capacity: 4 },
            { roomNumber: 1802, roomType: 'Overwater Bungalow', capacity: 4 }
          ]
        }
      ];
      

    await Hotel.insertMany(sampleHotels);
    res.status(201).json({ message: 'Sample hotels created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating hotels', error: error.message });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error: error.message });
  }
};

exports.getHotelDetails = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel details', error: error.message });
  }
};

exports.bookHotel = async (req, res) => {   
    try {     
      const { hotelId, roomNumber, checkInDate, checkOutDate } = req.body;
      
      console.log('Booking Request Details:', {
        hotelId,
        roomNumber, 
        checkInDate, 
        checkOutDate,
        userId: req.user.id
      });
  
      const hotel = await Hotel.findById(hotelId);
      
      if (!hotel) {
        console.error('Hotel not found:', hotelId);
        return res.status(404).json({ message: 'Hotel not found' });
      }
  
      console.log('Hotel Found:', hotel._id);
      console.log('Hotel Rooms:', hotel.rooms);
      console.log('Hotel Bookings:', hotel.bookings);
  
      // Find the room and check availability
      const room = hotel.rooms.find(r => r.roomNumber == roomNumber);
      
      console.log('Room Details:', room);
  
      if (!room) {
        console.error('Room not found:', roomNumber);
        return res.status(400).json({ message: 'Room does not exist' });
      }
  
      if (!room.available) {
        console.error('Room not available:', roomNumber);
        return res.status(400).json({ message: 'Room not available' });
      }
  
      // Check for overlapping bookings
      const existingBookings = hotel.bookings.filter(
        booking => 
          booking.roomNumber === roomNumber && 
          (
            (new Date(checkInDate) < new Date(booking.checkOutDate)) && 
            (new Date(checkOutDate) > new Date(booking.checkInDate))
          )
      );
  
      if (existingBookings.length > 0) {
        console.error('Room already booked for selected dates:', existingBookings);
        return res.status(400).json({ 
          message: 'Room is already booked for the selected dates',
          conflictingBookings: existingBookings
        });
      }
  
      // Calculate total price
      const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
      const totalPrice = hotel.price * nights;
  
      console.log('Booking Calculations:', {
        nights,
        hotelPricePerNight: hotel.price,
        totalPrice
      });
  
      // Create a new booking
      const booking = {
        user: req.user.id,
        checkInDate,
        checkOutDate,
        roomNumber,
        totalPrice
      };
  
      hotel.bookings.push(booking);
      
      // Mark room as unavailable
      const roomIndex = hotel.rooms.findIndex(r => r.roomNumber === roomNumber);
    //   hotel.rooms[roomIndex].available = false;
  
      console.log('Final Hotel State Before Save:', hotel);
  
      await hotel.save();
  
      console.log('Booking Successful:', booking);
      
      res.status(201).json({ 
        message: 'Hotel booked successfully', 
        booking 
      });
  
    } catch (error) {
      console.error('Booking Error:', {
        message: error.message,
        stack: error.stack
      });
  
      res.status(500).json({ 
        message: 'Error booking hotel', 
        error: error.message 
      });
    } 
  };
