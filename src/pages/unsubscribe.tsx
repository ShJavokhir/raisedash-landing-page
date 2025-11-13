import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';

function decodeEmailFromTokenUnsafe(token: string | undefined): string | null {
	if (!token) return null;
	try {
		const parts = token.split('.');
		if (parts.length < 2) return null;
		const payload = parts[1]
			.replace(/-/g, '+')
			.replace(/_/g, '/');
		const padLength = (4 - (payload.length % 4)) % 4;
		const padded = payload + '='.repeat(padLength);
		const json = Buffer.from(padded, 'base64').toString('utf-8');
		const obj = JSON.parse(json);
		return typeof obj.email === 'string' ? obj.email : null;
	} catch {
		return null;
	}
}

export default function Unsubscribe() {
	const router = useRouter();
	const token = typeof router.query.token === 'string' ? router.query.token : undefined;
	const [status, setStatus] = useState<'idle' | 'confirm' | 'submitting' | 'success' | 'error'>('idle');
	const [error, setError] = useState<string | null>(null);

	const email = useMemo(() => decodeEmailFromTokenUnsafe(token), [token]);

	useEffect(() => {
		if (token) {
			setStatus('confirm');
		}
	}, [token]);

	async function onConfirm() {
		if (!token) return;
		setError(null);
		setStatus('submitting');
		try {
			const resp = await fetch('/api/unsubscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token }),
			});
			if (!resp.ok) {
				const data = await resp.json().catch(() => ({}));
				setError(data.error || 'Failed to process request');
				setStatus('error');
				return;
			}
			setStatus('success');
		} catch {
			setError('Network error');
			setStatus('error');
		}
	}

	const title = 'Unsubscribe';

	return (
		<>
			<Head>
				<title>{title} — Raisedash</title>
				<meta name="robots" content="noindex" />
			</Head>
			<Container>
				<div className="mx-auto max-w-xl py-20">
					<h1 className="text-3xl font-bold mb-4">Unsubscribe</h1>
					{status === 'confirm' && (
						<div className="space-y-6">
							<p className="text-muted-foreground">
								{email ? (
									<span>
										You are about to unsubscribe the email <span className="font-medium">{email}</span> from future emails.
									</span>
								) : (
									<span>Are you sure you want to unsubscribe from future emails?</span>
								)}
							</p>
							<div className="flex gap-3">
								<Button onClick={onConfirm}>
									Yes, unsubscribe me
								</Button>
								<Button variant="secondary" onClick={() => router.push('/')}>Cancel</Button>
							</div>
						</div>
					)}

					{status === 'submitting' && (
						<p>Processing your request…</p>
					)}

					{status === 'success' && (
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold">You have been unsubscribed</h2>
							<p className="text-muted-foreground">We have recorded your preference. You won’t receive further emails.</p>
							<Button variant="secondary" onClick={() => router.push('/')}>Go back home</Button>
						</div>
					)}

					{status === 'error' && (
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold">Couldn’t process unsubscribe</h2>
							<p className="text-red-600">{error || 'Unknown error'}</p>
							<div className="flex gap-3">
								<Button onClick={onConfirm}>Try again</Button>
								<Button variant="secondary" onClick={() => router.push('/')}>Go back home</Button>
							</div>
						</div>
					)}
				</div>
			</Container>
		</>
	);
}


