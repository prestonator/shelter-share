export const fetchData = async (query, variables) => {
	const API_KEY = process.env.STRAPI_API_KEY;
	const GRAPHQL_ENDPOINT = process.env.STRAPI_GRAPHQL_ENDPOINT;
	try {
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return await res.json();
	} catch (error) {
		return console.log(error);
	}
};
