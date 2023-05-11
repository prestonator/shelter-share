import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import NavItem from "@/Components/Navbar/NavItem";
import { onBtnClick } from "@/utils/helpers";
import Footer from "@/Components/Footer/Footer";
import { playfair, sofia } from "@/utils/fonts";
import GoogleTag from "@/Components/Analytics/GoogleTag";

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
	openGraph: {
		title: "Shelter Share",
		description:
			"Shelter Share is an application that provides users with a list of nearby locations that offer shelter during a natural disaster, including community shelters, public buildings, and other safe locations.",
		url: "https://www.shelter-share.com/",
		siteName: "Shelter Share",
		locale: "en-US",
		type: "website",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${playfair.variable} ${sofia.variable}`}>
			<GoogleTag GTM_ID="GTM-M6QRZ75" />
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
