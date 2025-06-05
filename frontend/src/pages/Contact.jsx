import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us!</p>
      <form className="contact-form">
        <label>Name:</label>
        <input type="text" placeholder="Your Name" required />

        <label>Email:</label>
        <input type="email" placeholder="Your Email" required />

        <label>Message:</label>
        <textarea placeholder="Your Message" required></textarea>

        <button type="submit">Send Message</button>
      </form>
      <style jsx>{`
        .contact-container {
          padding: 20px;
          background-color: #fff;
          text-align: center;
        }

        .contact-container h2 {
          font-size: 28px;
          color: #2a2a72;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .contact-form label {
          margin: 10px 0;
        }

        .contact-form input,
        .contact-form textarea {
          width: 300px;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
        }

        .contact-form button {
          padding: 10px 20px;
          background-color: #2a2a72;
          color: white;
          border: none;
          cursor: pointer;
        }

        .contact-form button:hover {
          background-color: #3b3b98;
        }
      `}</style>
    </div>
  );
};

export default Contact;
