import { NextApiRequest, NextApiResponse } from 'next';
import { sendToTelegram, formatJobApplicationMessage, validateEmail, validateRequiredFields, JobApplicationData } from '@/lib/telegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: JobApplicationData = req.body;

    // Validate required fields
    const requiredFields = ['jobTitle', 'firstName', 'lastName', 'email', 'phone', 'experience', 'coverLetter'];
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

    // Validate cover letter length
    if (data.coverLetter.length < 50) {
      return res.status(400).json({ error: 'Cover letter must be at least 50 characters' });
    }

    // Send to Telegram
    const telegramMessage = formatJobApplicationMessage(data);
    const telegramResponse = await sendToTelegram(telegramMessage);

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', await telegramResponse.text());
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    // Log the application (optional - for debugging)
    console.log('Job application received:', {
      jobTitle: data.jobTitle,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      experience: data.experience,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Job application submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing job application:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
