import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: 'html',

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});