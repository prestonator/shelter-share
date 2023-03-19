import styles from "./page.module.css";
import { getLandingPage } from "@/utils/fetch/landingAPI";
import ReactMarkdown from "react-markdown";
async function getData() {
	const response = await getLandingPage();
	return response;
}

export default async function Home() {
	const landingPageData = await getData();
	console.log(landingPageData);
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
				<div className={styles.ctaMockup}></div>
				<div className={styles.ctaButtonContainer}></div>
			</section>
			<section className={styles.aboutSection}>
        <div className={styles.aboutHeading}>
          <h2>{landingPageData.aboutHeading}</h2>
        </div>
      </section>
		</main>
	);
}
