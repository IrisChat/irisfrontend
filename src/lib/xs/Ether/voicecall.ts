import { Peer } from 'peerjs';
import { http_host, API_BASE } from '$lib/xs/config.json';
const UID = localStorage.getItem('UID');
let peer: any;

export default function call(
	person: any,
	host: any,
	hostAudio: any,
	reciever: any,
	recieverAudio: any
) {
	// Create a new connection
	peer = new Peer(UID);
	host.muted = true;

	navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
		addStream(host, stream, hostAudio);

		peer.on('open', (id) => {
			console.log('Opened P2P connection.');
			callUser(person, stream, host, reciever, recieverAudio);
		});
		peer.on('call', (call) => {
			call.answer(stream);
			call.on('stream', (stream) => addStream(reciever, stream, recieverAudio));
		});
	});
}

function addStream(video: any, stream: any, audio: any) {
	console.log(stream);
	if (stream.getVideoTracks().length > 0) {
		video.srcObject = stream;
		video.addEventListener('loadedmetadata', () => video.play());
	}
	if (stream.getAudioTracks().length > 0) {
		// do something with the audio
		audio.srcObject = stream;
		audio.addEventListener('loadedmetadata', () => audio.play());
	}
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

async function callUser(user: any, stream: any, host: any, reciever: any, recieverAudio: any) {
	const users = await onLineUsers().then((users) => {
		return users;
	});
	// If the user is online, we try to call them
	if (users[user]) {
		const call = peer.call(user, stream);
		call.on('stream', (mediaStream) => {
			addStream(reciever, mediaStream, recieverAudio);
		});
		call.on('close', () => reciever.remove());
	} else {
		console.log('The user is offline. Cannot call.');
	}
}
