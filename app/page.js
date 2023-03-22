import React from "react";
import styles from "./page.module.css";
import { getLandingPage } from "@/utils/fetch/landingAPI";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import GooglePlayButton from "@/Components/StoreButtons/GooglePlay";
import AppleStoreButton from "@/Components/StoreButtons/AppleStore";
import { AiOutlineCheck } from "react-icons/ai";
import ReactPlayer from "react-player/lazy";

async function getData() {
	const response = await getLandingPage();
	return response;
}

export default async function Home() {
	const landingPageData = await getData();
	console.log(landingPageData.video.url);
	return (
		<main className={styles.main}>
			<section
				className={styles.heroSection}
				style={{
					backgroundImage: `linear-gradient(109.26deg, rgba(0, 0, 0, 0.9) 1.07%, rgba(20, 0, 255, 0.9) 100%), url(${landingPageData.heroSection.heroImage})`,
				}}
			>
				<div className={styles.heroTextContainer}>
					<ReactMarkdown>{`${landingPageData.heroSection.heroText}`}</ReactMarkdown>
				</div>
			</section>
			<section className={styles.ctaSection}>
				<div className={styles.ctaMockup}>
					<Image
						src={landingPageData.heroMockupUrl}
						alt={landingPageData.heroMockupAlt}
						fill
					/>
				</div>
				<div className={styles.ctaButtonContainer}>
					<GooglePlayButton />
					<AppleStoreButton />
				</div>
			</section>
			<section className={styles.aboutSection}>
				<div className={styles.aboutHeading}>
					<h2>{landingPageData.aboutHeading}</h2>
				</div>
				{landingPageData.infoSection.map((info) => {
					return (
						<div key={info.infoText} className={styles.infoText}>
							<Image
								src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${info.mockup.image.data.attributes.url}`}
								alt={info.mockup.alternativeText}
								width={100}
								height={100}
							/>
							<ReactMarkdown>{`${info.infoText.richText}`}</ReactMarkdown>
						</div>
					);
				})}
			</section>
			<section className={styles.featureSection}>
				<div className={styles.featureHeading}>
					<h2>{landingPageData.featureHeading}</h2>
				</div>
				{landingPageData.featureSection.map((feature) => {
					return (
						<div key={feature.featureText} className={styles.featureText}>
							<AiOutlineCheck />
							<ReactMarkdown>{`${feature.featureText}`}</ReactMarkdown>
						</div>
					);
				})}
			</section>
			<section className={styles.videoSection}>
				<div className={styles.videoHeading}>
					<h2>{landingPageData.videoHeading}</h2>
				</div>
				<div className={styles.videoContainer}>
					
				</div>
			</section>
		</main>
	);
}
