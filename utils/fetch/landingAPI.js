import { fetchData } from "@/utils/fetch";
import { LandingPageQuery } from "@/utils/query";

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
		videoHeading,
		video,
		accordion,
	} = landingPage.data.attributes;

	const landingPageData = {
		title,
		slug,
		heroSection: {
			...heroSection,
			heroImage: `${strapiUrl}${heroSection.heroImage.data.attributes.url}`,
		},
		heroMockupUrl: `${strapiUrl}${heroMockup.data.attributes.url}`,
		heroMockupAlt: heroMockup.data.attributes.alternativeText,
		aboutHeading,
		infoSection,
		featureHeading,
		featureSection,
		videoHeading,
		video: JSON.parse(video),
		accordionHeading: accordion.accordionHeading,
		accordionItem: accordion.accordionItem,
	};

	return landingPageData;
};
