import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://strenov.fr/',
  integrations: [react(), sitemap()],
  output: "server",
  adapter: netlify()
});