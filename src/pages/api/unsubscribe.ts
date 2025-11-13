import { NextApiRequest, NextApiResponse } from 'next';
import { sendToTelegram, formatUnsubscribeMessage } from '@/lib/telegram';
import { verifyJwtHs256, UnsubscribeClaims } from '@/lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const token = (req.body && typeof req.body.token === 'string') ? req.body.token : '';
		if (!token) {
			return res.status(400).json({ error: 'Missing token' });
		}

		const secret = process.env.UNSUBSCRIBE_JWT_SECRET;
		if (!secret) {
			console.error('UNSUBSCRIBE_JWT_SECRET is not set');
			return res.status(500).json({ error: 'Server misconfiguration' });
		}

		const verification = await verifyJwtHs256<UnsubscribeClaims>(token, secret);
		if (!verification.valid) {
			return res.status(401).json({ error: 'Invalid token', reason: verification.reason });
		}

		const claims = verification.claims;
		if (claims.sub !== 'unsubscribe' || !claims.email) {
			return res.status(400).json({ error: 'Invalid claims' });
		}

		const ip =
			(req.headers['x-forwarded-for']?.toString().split(',')[0].trim()) ||
			req.socket.remoteAddress ||
			undefined;
		const userAgent = req.headers['user-agent'] || undefined;

		const telegramMessage = formatUnsubscribeMessage({ email: claims.email, ip, userAgent });
		const telegramResponse = await sendToTelegram(telegramMessage);
		if (!telegramResponse.ok) {
			console.error('Telegram API error:', await telegramResponse.text());
			return res.status(502).json({ error: 'Failed to notify' });
		}

		return res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error processing unsubscribe:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
}


