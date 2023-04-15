import React from "react";
import styles from "./page.module.css";
import { getLandingPage } from "@/utils/fetch/landingAPI";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import GooglePlayButton from "@/Components/StoreButtons/GooglePlay";
import AppleStoreButton from "@/Components/StoreButtons/AppleStore";
import { AiOutlineCheck } from "react-icons/ai";
import VideoPlayer from "@/Components/VideoPlayer/VideoPlayer";
import Accordion from "@/Components/Accordion/Accordion";
import { getMediaData } from "@/utils/fetch/mediaAPI";

async function getLogos() {
	const [ouLogo, bbLogo] = await getMediaData([13, 12]);
	return [ouLogo, bbLogo];
}

async function getData() {
	const response = await getLandingPage();
	const [ouLogo, bbLogo] = await getMediaData([13, 12]);
	return response;
}

export default async function Home() {
	const landingPageData = await getData();
	const [ouLogo, bbLogo] = await getLogos();
	return (
		<main className={styles.main}>
			<section
				className={styles.heroSection}
				style={{
					backgroundImage: `url(${landingPageData.heroSection.heroImage}), linear-gradient(109.26deg, rgba(0, 0, 0, 0.9) 1.07%, rgba(20, 0, 255, 0.9) 100%)`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<div className={styles.heroTextContainer}>
					<ReactMarkdown>{`${landingPageData.heroSection.heroText}`}</ReactMarkdown>
				</div>
			</section>
			<section className={styles.ctaSection} id="cta">
				<div className={styles.ctaMockup}>
					<Image
						src={landingPageData.heroMockupUrl}
						alt={landingPageData.heroMockupAlt}
						fill
						className={styles.image}
					/>
				</div>
				<div className={styles.ctaButtonContainer}>
					<AppleStoreButton />
					<GooglePlayButton />
				</div>
			</section>
			<section className={styles.aboutSection} id="about">
				<div className={styles.aboutHeading}>
					<h2>{landingPageData.aboutHeading}</h2>
				</div>
				<div className={styles.aboutRow}>
					{landingPageData.infoSection.map((info, index) => {
						return (
							<div
								key={info.infoText}
								className={`${styles.infoText} ${
									index % 2 === 0 ? styles.even : styles.odd
								}`}
							>
								<div className={styles.mockupWrapper}>
									<div className={styles.imageWrapper}>
										<Image
											src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${info.mockup.image.data.attributes.url}`}
											alt={info.mockup.alternativeText}
											fill
										/>
									</div>
								</div>
								<div className={styles.infoTextWrapper}>
									<ReactMarkdown>{`${info.infoText.richText}`}</ReactMarkdown>
								</div>
							</div>
						);
					})}
				</div>
			</section>
			<section className={styles.featureSection} id="features">
				<div className={styles.featureHeading}>
					<h2>{landingPageData.featureHeading}</h2>
				</div>
				{landingPageData.featureSection.map((feature) => {
					return (
						<div key={feature.featureText} className={styles.featureText}>
							<AiOutlineCheck />
							<div className={`${styles.featureContent}`}>
								<ReactMarkdown>{`${feature.featureText}`}</ReactMarkdown>
							</div>
						</div>
					);
				})}
			</section>
			<section className={styles.videoSection} id="video">
				<div className={styles.videoHeading}>
					<h2>{landingPageData.videoHeading}</h2>
				</div>
				<div className={styles.videoContainer}>
					<VideoPlayer url={landingPageData.video.url} />
				</div>
			</section>
			<section className={styles.faqSection} id="faq">
				<div className={styles.faqHeading}>
					<h2>{landingPageData.accordionHeading}</h2>
				</div>
				<div className={styles.faqContainer}>
					<Accordion accordionItem={landingPageData.accordionItem} />
				</div>
			</section>
			<section className={styles.poweredBySection} id="poweredBy">
				<h2>Powered By:</h2>
				<div className={styles.poweredByContainer}>
					<div className={`${styles.poweredBy}`}>
						<div className={styles.poweredByWrapper}>
							<Image
								src={bbLogo.fullUrl}
								alt={bbLogo.altText}
								fill
								className={styles.image}
							/>
						</div>
					</div>
					<div className={`${styles.poweredBy}`}>
						<div className={styles.poweredByWrapper}>
							<Image
								src={ouLogo.fullUrl}
								alt={ouLogo.altText}
								fill
								className={styles.image}
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
