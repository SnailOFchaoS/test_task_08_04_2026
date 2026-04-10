export const authHeaders = (token: string): HeadersInit => {
	const h: Record<string, string> = {
		'Content-Type': 'application/json',
	}
	if (token) {
		h.Authorization = `Bearer ${token}`
	}
	return h
}
