import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    deps: { optimizer: { web: { include: ['vitest-canvas-mock'] } } },
  },
});
