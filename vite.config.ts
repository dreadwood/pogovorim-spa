import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { svgSpritemap } from 'vite-plugin-svg-spritemap'

function getPath(relativePath: string): string {
  return fileURLToPath(new URL(relativePath, import.meta.url))
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const baseUrl = mode === 'production' && env.BASE_URL ? env.BASE_URL : '/'

  return {
    base: baseUrl,
    plugins: [
      react(),
      svgSpritemap({
        pattern: 'src/assets/icons/*.svg',
        filename: 'assets/sprite.svg',
        svgo: false
      })
    ],
    resolve: {
      alias: {
        '@': getPath('./src'),
        '@style': getPath('./src/assets/style'),
        '@fonts': getPath('./src/assets/fonts')
      }
    }
  }
})
