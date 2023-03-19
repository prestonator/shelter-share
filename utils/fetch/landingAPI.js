import { fetchData } from "../fetch";
import { LandingPageQuery } from "../query";

export const getLandingPage = async () => {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
	const { data } = await fetchData(LandingPageQuery);
	const { landingPage } = data;
	const {
		title,
		slug,
		heroSection,
		heroMockup,
		aboutHeading,
		infoSection,
		featureHeading,
		featureSection,
		faqHeading,
		videoHeading,
		video,
	} = landingPage.data.attributes;

	const landingPageData = {
		title,
		slug,
		heroSection: {
			...heroSection,
			heroImage: `${strapiUrl}${heroSection.heroImage.data.attributes.url}`,
		},
		heroMockup: heroMockup.data.attributes,
		aboutHeading,
		infoSection: infoSection.map((section) => ({
			...section,
			mockup: {
				image: section.mockup.image.data.attributes,
			},
		})),
		featureHeading,
		featureSection,
		faqHeading,
		videoHeading,
		video,
	};

	return landingPageData;
};
