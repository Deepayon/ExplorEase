import React from 'react';
import axios from 'axios';

const RazorpayButton = () => {
  const displayRazorpay = async () => {
    try {
      const { data: order } = await axios.post('https://your-backend-url/api/payment/create-order', {
        amount: 500, // Amount in INR
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'ExplorEase',
        description: 'Travel Booking Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post('https://your-backend-url/api/payment/verify', response);
            alert(verifyRes.data.message);
          } catch (err) {
            alert('Verification failed');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9876543210',
        },
        notes: {
          address: 'ExplorEase Corp',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong while initiating payment');
    }
  };

  return (
    <button onClick={displayRazorpay} className="btn btn-primary">
      Pay ₹500
    </button>
  );
};

export default RazorpayButton;
