import { defineConfig, preview } from 'vite'

export default defineConfig(({command, mode}) => {
  return {
    root: './src',
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
