export default function pL(text: string) {
	const _url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
	if (_url.test(text)) {
		text = `<a href = ${text}>${text}</a>`;
	}
	return text;
}
