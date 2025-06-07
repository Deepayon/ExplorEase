import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton, Paper, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const AIChatAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I’m EaseBot. Ready to help you plan, explore, or find your next destination!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/ai/chat`, { message: userMessage.text });
      const aiReply = res.data && res.data.reply ? res.data.reply : 'Sorry, I could not process your request.';
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (err) {
      let errorMsg = 'Sorry, I could not process your request.';
      if (err.response && err.response.data && err.response.data.details) {
        errorMsg += ` (${err.response.data.details})`;
      }
      setMessages(prev => [...prev, { sender: 'ai', text: errorMsg }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="ai-chat-bg">
      <Paper elevation={4} className="ai-chat-paper">
        <Typography variant="h5" gutterBottom align="center" className="ai-chat-title">
          <span role="img" aria-label="robot">🤖</span> EaseBot Assistant
        </Typography>
        <Box className="ai-chat-messages">
          {messages.map((msg, idx) => (
            <Box
              key={idx}

              className={`ai-chat-row ${msg.sender === 'user' ? 'user' : 'ai'}`}
            >
              <Box className={`ai-chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                {msg.text}
              </Box>
            </Box>
          ))}
          <div ref={chatEndRef} />
        </Box>
        <Box className="ai-chat-suggestions">
          {["Best places to visit in Europe", "Budget travel tips", "Family-friendly destinations", "Visa requirements for Japan"].map((suggestion, idx) => (
            <span
              key={idx}
              className="ai-chat-suggestion"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </span>
          ))}
        </Box>
        <Box className="ai-chat-input-row">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="ai-chat-input"
          />
          <IconButton
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="ai-chat-send-btn"
            aria-label="Send"
          >
            {loading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Paper>
      <style>{`
        .ai-chat-bg {
          min-height: 100vh;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          animation: fadeInBg 1.2s;
        }
        @keyframes fadeInBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ai-chat-paper {
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 1.5rem 1.5rem;
          border-radius: 28px;
          background: rgba(255,255,255,0.97);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
          animation: popIn 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes popIn {
          0% { transform: scale(0.85) translateY(40px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .ai-chat-title {
          font-weight: 800;
          color: #1976d2;
          letter-spacing: 1px;
          margin-bottom: 1.2rem;
          text-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
          transition: color 0.3s;
        }
        .ai-chat-title:hover {
          color: #0d47a1;
          text-shadow: 0 4px 16px rgba(44, 62, 80, 0.18);
        }
        .ai-chat-messages {
          display: flex;
          flex-direction: column;
          max-height: 340px;
          overflow-y: auto;
          margin-bottom: 1.2rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f4f7f6 60%, #e0eafc 100%);
          border-radius: 18px;
          box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.07);
          transition: box-shadow 0.3s;
          scroll-behavior: smooth;
        }
        .ai-chat-row {
          display: flex;
          width: 100%;
          margin-bottom: 0.7rem;
        }
        .ai-chat-row.user {
          justify-content: flex-end;
        }
        .ai-chat-row.ai {
          justify-content: flex-start;
        }
        .ai-chat-bubble {
          padding: 0.7rem 1.2rem;
          border-radius: 18px;
          font-size: 1rem;
          max-width: 80%;
          word-break: break-word;
          box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.07);
          opacity: 0;
          animation: bubbleIn 0.4s forwards;
          transition: background 0.3s, color 0.3s, transform 0.2s;
        }
        .ai-chat-bubble.user {
          background: linear-gradient(135deg, #1976d2 60%, #64b5f6 100%);
          color: #fff;
          text-align: right;
          animation-delay: 0.05s;
        }
        .ai-chat-bubble.ai {
          background: #e0e0e0;
          color: #222;
          text-align: left;
          animation-delay: 0.1s;
        }
        .ai-chat-bubble:hover {
          transform: scale(1.04) translateY(-2px);
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.13);
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .ai-chat-input-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0; /* Keep this at 0 for tightness above, spacing is handled by suggestions */
        }
        .ai-chat-input .MuiOutlinedInput-root {
          border-radius: 16px;
          background: #f4f7f6;
          transition: box-shadow 0.3s;
        }
        .ai-chat-input .MuiOutlinedInput-root.Mui-focused {
          box-shadow: 0 0 0 2px #1976d2;
          border-radius: 16px;
          border: 2px solid #1976d2;
          transition: background 0.3s, transform 0.2s, border-color 0.3s;
        }
        .ai-chat-send-btn {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          transition: background 0.3s, transform 0.2s;
        }
        .ai-chat-send-btn .MuiSvgIcon-root {
          color: #1976d2;
          transition: color 0.2s;
        }
        .ai-chat-send-btn:hover .MuiSvgIcon-root {
          color: #fff;
        }
        .ai-chat-send-btn:hover {
          background: #1976d2 !important;
          color: #fff !important;
          border-color: #1976d2;
          transform: scale(1.1);
        }
        .ai-chat-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 1.1rem; /* Increased for a little more gap */
          margin-top: 0.5rem;
        }
        .ai-chat-suggestion {
          background: #e0eafc;
          color: #1976d2;
          border-radius: 14px;
          padding: 6px 14px;
          font-size: 0.97rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          border: 1px solid #cfdef3;
        }
        .ai-chat-suggestion:hover {
          background: #1976d2;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default AIChatAssistant;