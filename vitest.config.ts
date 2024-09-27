import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // If you want to use globals like 'describe', 'it', etc.
    environment: "node", // or 'jsdom', depending on your test needs
    coverage: {
      reporter: ["text", "html"], // For test coverage reports
    },
  },
});
