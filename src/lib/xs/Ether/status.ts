// Read storage
import 'node-localstorage/register';
import { http_host, API_BASE } from '$lib/xs/config.json'; // @ts-ignore
const token = localStorage.getItem('token');

export default (status: string, userData: any) => {
	userData.status = status;
	// userData = userData; // Trigger
	localStorage.setItem('userData', JSON.stringify(userData));
	fetch(`${http_host}${API_BASE}user/status/`, {
		method: 'POST', // @ts-ignore
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			status
		})
	});
};
