import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  start: {
    server: {
      preset: "netlify" // this has no effect
    }
  }
});