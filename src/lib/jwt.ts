// Minimal HS256 JWT verification without extra deps
// Only supports verification and decoding claims safely for this app.

function base64UrlDecode(input: string): Uint8Array {
	const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
	const padLength = (4 - (normalized.length % 4)) % 4;
	const padded = normalized + '='.repeat(padLength);
	const binary = Buffer.from(padded, 'base64');
	return new Uint8Array(binary);
}

function base64UrlEncode(bytes: Uint8Array): string {
	return Buffer.from(bytes)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/g, '');
}

async function hmacSha256(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
	if (typeof crypto !== 'undefined' && 'subtle' in crypto) {
		// Convert Uint8Array to ArrayBuffer for Web Crypto API compatibility
		// Create new ArrayBuffer to avoid SharedArrayBuffer issues
		const keyBuffer = new ArrayBuffer(key.byteLength);
		const keyView = new Uint8Array(keyBuffer);
		keyView.set(key);
		
		const dataBuffer = new ArrayBuffer(data.byteLength);
		const dataView = new Uint8Array(dataBuffer);
		dataView.set(data);
		
		const cryptoKey = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
		const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
		return new Uint8Array(signature);
	} else {
		// Node.js fallback
		const { createHmac } = await import('node:crypto');
		const h = createHmac('sha256', Buffer.from(key));
		h.update(Buffer.from(data));
		return new Uint8Array(h.digest());
	}
}

export interface UnsubscribeClaims {
	email: string;
	iat: number;
	exp: number;
	sub: 'unsubscribe';
}

export type VerifyResult<T> = { valid: true; header: Record<string, unknown>; claims: T } | { valid: false; reason: string };

export async function verifyJwtHs256<T = Record<string, unknown>>(token: string, secret: string): Promise<VerifyResult<T>> {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) return { valid: false, reason: 'Malformed token' };
		const [encodedHeader, encodedPayload, encodedSignature] = parts;
		const headerBytes = base64UrlDecode(encodedHeader);
		const payloadBytes = base64UrlDecode(encodedPayload);
		// signatureBytes is decoded but not used in verification

		const headerJson = new TextDecoder().decode(headerBytes);
		const payloadJson = new TextDecoder().decode(payloadBytes);
		const header = JSON.parse(headerJson);
		const claims: T = JSON.parse(payloadJson);

		if (header.alg !== 'HS256' || header.typ !== 'JWT') {
			return { valid: false, reason: 'Unsupported algorithm or type' };
		}

		const signingInput = Buffer.from(`${encodedHeader}.${encodedPayload}`);
		const expectedSig = await hmacSha256(new TextEncoder().encode(secret), new Uint8Array(signingInput));
		const expectedSigB64 = base64UrlEncode(expectedSig);
		if (expectedSigB64 !== encodedSignature) {
			return { valid: false, reason: 'Invalid signature' };
		}

		const now = Math.floor(Date.now() / 1000);
		// @ts-expect-error generic may not have exp
		if (claims.exp && typeof claims.exp === 'number' && now >= claims.exp) {
			return { valid: false, reason: 'Token expired' };
		}

		return { valid: true, header, claims };
	} catch {
		return { valid: false, reason: 'Verification error' };
	}
}

export function decodeClaimsUnsafe<T = Record<string, unknown>>(token: string): T | null {
	try {
		const parts = token.split('.');
		if (parts.length < 2) return null;
		const [, encodedPayload] = parts;
		const payloadBytes = base64UrlDecode(encodedPayload);
		const payloadJson = new TextDecoder().decode(payloadBytes);
		return JSON.parse(payloadJson);
	} catch {
		return null;
	}
}


