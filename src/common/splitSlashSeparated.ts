export function splitSlashSeparated(value: string): string[] {
	return value
		.split('/')
		.map((part) => part.trim())
		.filter(Boolean)
}
