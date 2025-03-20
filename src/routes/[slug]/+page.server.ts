import { data } from '$lib/server/data';

export const load = (ev) => {
	return {
		slug: ev.params.slug,
		map: data.find((d) => d.slug === ev.params.slug)?.map ?? []
	};
};
