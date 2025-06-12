const express = require('express');
const router = express.Router();
const axios = require('axios');
const axiosRetry = require('axios-retry').default; 

// Retry if rate-limited (429)
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => error.response && error.response.status === 429
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://xplorease.netlify.app', // if hosted, use your actual frontend domain
          'X-Title': 'ExplorEase AI Chatbot'
        }
      }
    )

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'AI service error',
      details: error.response?.data?.error || error.message
    });
  }
});

module.exports = router;