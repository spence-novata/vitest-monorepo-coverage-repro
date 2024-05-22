import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      all: false,
      reporter: ["text", "json", "html"],
      reportsDirectory: "../../coverage/project",
    },
  },
});
