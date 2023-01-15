import { Peer } from 'peerjs';
import { http_host, API_BASE } from '$lib/xs/config.json';
const UID = localStorage.getItem('UID');
const peer = new Peer(UID);

export default function call(person: any, host: any, reciever: any) {
	// Create a new connection

	host.muted = true;

	navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
		addStream(host, stream);

		peer.on('open', (id) => {
			console.log('Opened P2P connection.');
			callUser(person, stream, host, reciever);
		});
		peer.on('call', (call) => {
			call.answer(stream);
			call.on('stream', (stream) => addStream(reciever, stream));
		});
	});
}

function addStream(video: any, stream: any) {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => video.play());
}

// Returns who all is online on the server
function onLineUsers() {
	return fetch(`${http_host}${API_BASE}users/online`)
		.then((response) => response.json())
		.then((response) => {
			return response;
		})
		.catch((error) => console.warn(error));
}

async function callUser(user: any, stream: any, host: any, reciever: any) {
	const users = await onLineUsers().then((users) => {
		return users;
	});
	// If the user is online, we try to call them
	if (users[user] != undefined) {
		const call = peer.call(user, stream);
		call.on('stream', (mediaStream) => {
			addStream(reciever, mediaStream);
		});
		call.on('close', () => reciever.remove());
	} else {
		console.log('The user is offline. Cannot call.');
	}
}
