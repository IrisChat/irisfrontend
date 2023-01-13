import { parseMd } from '$lib/xs/preprocessors/parseMd';

export default function __prprcs(text: string) {
	text = parseMd(text);
	return text;
}
