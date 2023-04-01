import { fetchData } from "@/utils/fetch";
import { MediaQuery } from "@/utils/query";

export const getMediaData = async (ids) => {
	const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
	const promises = ids.map((id) =>
		fetchData(MediaQuery, { uploadFileId: id })
			.then((res) => {
				const altText = res.data.uploadFile.data.attributes.alternativeText;
				const fullUrl = strapiUrl + res.data.uploadFile.data.attributes.url;
				return { altText, fullUrl };
			})
			.catch((err) => {
				console.error(`Error fetching media data for ID ${id}:`, err);
				return null;
			})
	);
	const results = await Promise.allSettled(promises);
	const data = results
		.filter((result) => result.status === "fulfilled")
		.map((result) => result.value);
	return data;
};
