const SAFE_PUNCT = '_@.!#$%^&*()+=-[]{}?:/'

function isAllowedChar(char: string): boolean {
	if (/\p{L}/u.test(char) || /\p{N}/u.test(char)) {
		return true
	}
	return SAFE_PUNCT.includes(char)
}

export function sanitizeRestrictedInput(value: string): string {
	let out = ''
	for (const char of value) {
		if (isAllowedChar(char)) {
			out += char
		}
	}
	return out
}
