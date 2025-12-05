import { NextApiRequest, NextApiResponse } from 'next';
import { 
  sendToTelegram, 
  formatAccountDeletionMessage, 
  validateEmail, 
  validateRequiredFields, 
  AccountDeletionRequestData 
} from '@/lib/telegram';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: AccountDeletionRequestData = req.body;

    const baseRequired = ['product', 'fullName'];
    const missingFields = validateRequiredFields(data as unknown as Record<string, unknown>, baseRequired);

    if (data.product === 'raisedash') {
      if (!data.email || data.email.trim() === '') {
        missingFields.push('email');
      }
    } else if (data.product === 'raisedash_vertex') {
      if (!data.phone || data.phone.trim() === '') {
        missingFields.push('phone');
      }
    } else {
      return res.status(400).json({ error: 'Invalid product selection' });
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields,
      });
    }

    if (data.email && !validateEmail(data.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const telegramMessage = formatAccountDeletionMessage(data);
    const telegramResponse = await sendToTelegram(telegramMessage);

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', await telegramResponse.text());
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    console.log('Account deletion request received:', {
      product: data.product,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Account deletion request submitted successfully',
    });
  } catch (error) {
    console.error('Error processing account deletion request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
