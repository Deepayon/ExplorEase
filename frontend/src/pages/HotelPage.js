import React from 'react';
import { useParams } from 'react-router-dom';
import HotelDetails from '../components/HotelDetails';

const HotelPage = () => {
  const { id } = useParams();

  return (
    <div>
      <HotelDetails hotelId={id} />
    </div>
  );
};

export default HotelPage;