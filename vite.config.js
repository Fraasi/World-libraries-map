import { defineConfig, preview } from 'vite'

export default defineConfig(({command, mode}) => {
  return {
    root: './src',
    base: '/World-libraries-map/',
    build: {
      emptyOutDir: true,
      outDir: '../docs',
    },
    server: {
      open: '/index.html'
    },
    preview: {
      open: '/index.html'
    }
  }
})
