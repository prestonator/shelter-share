import { Sofia_Sans, Playfair_Display } from "next/font/google";

export const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-fancy",
	display: "swap",
});

export const sofia = Sofia_Sans({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

