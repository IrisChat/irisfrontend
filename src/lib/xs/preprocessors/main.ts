import { parseMd } from '$lib/xs/preprocessors/parseMd';
import parseLink from '$lib/xs/preprocessors/renderLink';

export default function __prprcs(text: string) {
	text = parseMd(text);
	text = parseLink(text);
	return text;
}
