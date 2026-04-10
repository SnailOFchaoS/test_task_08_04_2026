import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	base: mode === 'production' ? '/test_task_08_04_2026/' : '/',
	plugins: [react()],
}))
