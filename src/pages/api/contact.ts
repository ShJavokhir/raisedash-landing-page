import { NextApiRequest, NextApiResponse } from 'next';
import { sendToTelegram, formatContactMessage, validateEmail, validateRequiredFields, ContactFormData } from '@/lib/telegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: ContactFormData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = validateRequiredFields(data, requiredFields);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }

    // Validate email format
    if (!validateEmail(data.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send to Telegram
    const telegramMessage = formatContactMessage(data);
    const telegramResponse = await sendToTelegram(telegramMessage);

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', await telegramResponse.text());
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    // Log the contact form submission (optional - for debugging)
    console.log('Contact form submission received:', {
      name: data.name,
      email: data.email,
      company: data.company,
      inquiryType: data.inquiryType,
      subject: data.subject,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
