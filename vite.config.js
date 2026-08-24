import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bio: resolve(__dirname, 'bio/index.html'),
        graphic: resolve(__dirname, 'graphic/index.html'),
        graphicPortlandPop: resolve(__dirname, 'graphic/portlandPop/index.html'),
        graphicUniqloWindow: resolve(__dirname, 'graphic/uniqloWindow/index.html'),
        graphicVeniceCCR: resolve(__dirname, 'graphic/veniceCCR/index.html'),
        ux: resolve(__dirname, 'ux/index.html'),
        uxDrivelineBaseball: resolve(__dirname, 'ux/drivelineBaseball/index.html'),
        uxPortlandPop: resolve(__dirname, 'ux/portlandPop/index.html'),
        uxShelleyJordon: resolve(__dirname, 'ux/shelleyJordon/index.html'),
        webDev: resolve(__dirname, 'webDev/index.html'),
      },
    },
  },
});
