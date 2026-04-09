import { jwtDecode } from 'jwt-decode'

export type JwtPayloadBase = {
	exp?: number
	iat?: number
	iss?: string
	aud?: string
	sub?: string
	[key: string]: unknown
}

export function decodeJwtPayload<T extends Record<string, unknown> = JwtPayloadBase>(
	token: string,
): T | null {
	try {
		return jwtDecode<T>(token.trim())
	} catch {
		return null
	}
}
