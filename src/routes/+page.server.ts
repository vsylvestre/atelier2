import { data } from '$lib/server/data';
import urlMetadata from 'url-metadata';

export const load = async () => {
	const metadata = await Promise.all(
		data.flatMap((d) =>
			d.map.flatMap(async (m) => {
				if (!m.url) {
					return null;
				}
				try {
					const url = new URL(m.url);
					const metadata = await urlMetadata(url.toString());
					return metadata['description'];
				} catch {
					return null;
				}
			})
		)
	);
	return {
		metadata
	};
};
