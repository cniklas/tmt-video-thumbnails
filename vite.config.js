import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
process.env.BROWSER = 'chrome' // for '--open' command

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
})
