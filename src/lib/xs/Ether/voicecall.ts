import { Peer } from 'peerjs';
import { http_host, API_BASE } from '$lib/xs/config.json';
const UID = localStorage.getItem('UID');
let peer: any;
let thisCall: any;

export function init(host: any, hostAudio: any, receiver: any, receiverAudio: any) {
	// Keep to string to avoid complications and unreachability
	const id = UID?.toString();
	host.muted = true;
	console.log('P2P initialized with ID #' + id);
	// Get the peer and give the script access to the callPane
	peer = new Peer(id, {
		debug: 3,
		config: {
			iceServers: [
				{ url: 'stun:stun.l.google.com:19302' },
				{ url: 'stun:stun1.l.google.com:19302' },
				{ url: 'stun:stun2.l.google.com:19302' },
				{ url: 'stun:stun3.l.google.com:19302' },
				{ url: 'stun:stun4.l.google.com:19302' },
				{ url: 'turn:0.peerjs.com:3478', username: 'peerjs', credential: 'peerjsp' }
			],
			sdpSemantics: 'unified-plan'
			// iceTransportPolicy: 'relay' // <- it means using only relay server (our free turn server in this case)
		}
	});
	peer.on('open', (id: any) => {
		console.log('Opened P2P connection.');
	});
	peer.on('call', (call: any) => {
		const acceptCall = confirm('Videocall incoming, do you want to accept it?');
		if (acceptCall) {
			thisCall = call;
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream) => {
					call.answer(stream); //  @ts-ignore We reference the callPane by ID
					addStream(host, stream, hostAudio); // Unhide the callpane because we need it
					receiverELEM.classList.remove('hidden');
					callPane.classList.remove('hidden');
					call.on('stream', (stream: MediaStream) => addStream(receiver, stream, receiverAudio));
					call.on('close', () => {
						// receiver.remove();
						receiverELEM.classList.add('hidden'); // Hide the callpane again as we won't need it
						callPane.classList.add('hidden');
					});
				})
				.catch((e) => {
					// This makes the video optional
					console.warn(e);
					const stream = new MediaStream();
					call.answer(stream); //  @ts-ignore We reference the callPane by ID
					addStream(host, stream, hostAudio); // Unhide the callpane because we need it
					receiverELEM.classList.remove('hidden');
					callPane.classList.remove('hidden');
					call.on('stream', (stream: MediaStream) => addStream(receiver, stream, receiverAudio));
					call.on('close', () => {
						// receiver.remove(); // Hide the callpane again as we wont need it
						receiverELEM.classList.add('hidden');
						callPane.classList.add('hidden');
					});
				});
		}
	});
}

export default function call(
	person: any,
	host: any,
	hostAudio: any,
	receiver: any,
	receiverAudio: any
) {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: true })
		.then((stream) => {
			addStream(host, stream, hostAudio);
			callUser(person, stream, host, receiver, receiverAudio);
		})
		.catch((e) => {
			console.warn(e);
			const stream = new MediaStream();
			addStream(host, stream, hostAudio);
			callUser(person, stream, host, receiver, receiverAudio);
		});
}

function addStream(video: any, stream: any, audio: any) {
	console.log(stream);
	if (stream.getVideoTracks().length > 0) {
		video.srcObject = stream;
		video.addEventListener('loadedmetadata', () => video.play());
		video.classList.remove('hidden');
	}
	if (stream.getAudioTracks().length > 0) {
		// Do something with the audio
		audio.srcObject = stream;
		audio.addEventListener('loadedmetadata', () => audio.play());
		audio.classList.remove('hidden');
	}
}

// Returns who all is online on the server
// @audit onLineUsers - Bookmark
function onLineUsers() {
	return fetch(`${http_host}${API_BASE}users/online`)
		.then((response) => response.json())
		.then((response) => {
			return response;
		})
		.catch((error) => console.warn(error));
}

// @todo callUser - Something is not working here
async function callUser(user: any, stream: any, host: any, receiver: any, receiverAudio: any) {
	const users = await onLineUsers().then((users) => {
		return users;
	});
	// If the user is online, we try to call them
	if (users[user]) {
		const call = peer.call(user, stream);
		thisCall = call;
		console.log(`Calling ${user}...`);
		call.on('stream', (stream: MediaStream) => addStream(receiver, stream, receiverAudio));
		call.on('close', () => {
			receiver.remove();
			receiverELEM.classList.add('hidden'); // Hide the callpane again as we won't need it
			callPane.classList.remove('hidden');
		});
	} else {
		alert('The user is offline. Cannot call.');
	}
}

export function endCall() {
	// Go back to the menu
	if (!thisCall) return;

	try {
		thisCall.close();
	} catch {}
	thisCall = undefined;
}
