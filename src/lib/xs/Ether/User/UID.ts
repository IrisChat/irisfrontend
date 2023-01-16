import { http_host, API_BASE } from '$lib/xs/config.json';

export function getUser(person: any) {
	return fetch(`${http_host}${API_BASE}user/${person}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST'
	}).then((res) => {
		if (res.status != 200) {
			console.log('Shit happened. Going back...');
			history.back();
		}

		return res.json();
	});
}
