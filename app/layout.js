import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import NavItem from "@/Components/Navbar/NavItem";
import { onBtnClick } from "@/utils/helpers";
import Footer from "@/Components/Footer/Footer";
import { playfair, sofia } from "@/utils/fonts";

export const metadata = {
	title: "Shelter Share",
	description: "Shelter Share's landing page",
	icons: {
		icon: [
			{ url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
		shortcut: "/icons/favicon.ico",
		apple: "/icons/apple-touch-icon.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${playfair.variable} ${sofia.variable}`}>
			<body>
				<Navbar>
					<NavItem onBtnClick={onBtnClick} />
				</Navbar>
				{children}
				<Footer />
			</body>
		</html>
	);
}
