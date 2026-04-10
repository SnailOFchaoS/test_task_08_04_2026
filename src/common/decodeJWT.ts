import { jwtDecode } from 'jwt-decode'

export type JwtPayloadValue = string | number | boolean | undefined

export type JwtPayloadBase = {
	exp?: number
	iat?: number
	iss?: string
	aud?: string
	sub?: string
	username?: string
	role?: string
	userId?: string
	[key: string]: JwtPayloadValue
}

export const decodeJwtPayload = (token: string): JwtPayloadBase | null => {
	try {
		return jwtDecode<JwtPayloadBase>(token.trim())
	} catch {
		return null
	}
}
