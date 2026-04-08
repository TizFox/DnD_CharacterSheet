// Source - https://stackoverflow.com/q/79584290
// Posted by shadyseal
// Retrieved 2026-04-08, License - CC BY-SA 4.0

import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{svelte,html,js,ts}"],
	theme: {
		extend: {
			fontFamily: {
				mono: [...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [],
} satisfies Config;
