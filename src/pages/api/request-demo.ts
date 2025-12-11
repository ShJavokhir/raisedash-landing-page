import { NextApiRequest, NextApiResponse } from 'next';
import { sendToTelegram, formatDemoMessage, validateEmail, validateRequiredFields, DemoRequestData } from '@/lib/telegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: DemoRequestData = req.body;

    // Validate required fields
    const requiredFields = ['email', 'companyName', 'companySize', 'fullName', 'role'];
    const missingFields = validateRequiredFields(data as unknown as Record<string, unknown>, requiredFields);
    
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

    // Ensure company size option is valid
    const allowedSizes = ['1-10 trucks', '11-50 trucks', '51-200 trucks', '201+ trucks'];
    if (!allowedSizes.includes(data.companySize)) {
      return res.status(400).json({ error: 'Invalid company size selection' });
    }

    // Send to Telegram
    const telegramMessage = formatDemoMessage(data);
    const telegramResponse = await sendToTelegram(telegramMessage);

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', await telegramResponse.text());
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    // Log the request (optional - for debugging)
    console.log('Demo request received:', {
      name: data.fullName,
      email: data.email,
      companyName: data.companyName,
      companySize: data.companySize,
      role: data.role,
      phone: data.phone,
      timestamp: new Date().toISOString(),
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
