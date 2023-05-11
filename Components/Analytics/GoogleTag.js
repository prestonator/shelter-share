"use client";
import Script from "next/script";

const GoogleTag = ({ GTM_ID }) => {
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GTM_ID}');
        `}
			</Script>
		</>
	);
};

export default GoogleTag;
