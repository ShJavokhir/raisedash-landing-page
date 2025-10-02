import { NextApiRequest, NextApiResponse } from 'next';

interface DemoRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: DemoRequestData = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email'];
    const missingFields = requiredFields.filter(field => !data[field as keyof DemoRequestData]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send to Telegram
    const telegramMessage = formatTelegramMessage(data);
    const telegramResponse = await sendToTelegram(telegramMessage);

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', await telegramResponse.text());
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    // Log the request (optional - for debugging)
    console.log('Demo request received:', {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      company: data.company,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Demo request submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing demo request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function formatTelegramMessage(data: DemoRequestData): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return `🚀 *New Demo Request Received*

👤 *Contact Information*
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone || 'Not provided'}

⏰ *Submitted:* ${timestamp}

---
_This notification was sent automatically from the Raisedash demo request form._`;
}

async function sendToTelegram(message: string): Promise<Response> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error('Telegram configuration missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  };

  return fetch(telegramApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
