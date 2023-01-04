<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/Channels/MainChannel.svelte';
	import { faMessage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { http_host, ws_host, API_BASE } from '$lib/js/config.json';
	import { page } from '$app/stores';
	import { setUser } from '$lib/js/userData';
	import Fa from 'svelte-fa';

	// Read storage
	import 'node-localstorage/register';
	import ServerMessage from '$lib/content/ServerMessage.svelte';
	import UserMessage from '$lib/content/UserMessage.svelte';
	const userData = JSON.parse(localStorage.getItem('userData')) || {};
	const token = localStorage.getItem('token');
	const UID = localStorage.getItem('UID');
	let messageList_UI;

	class msgFMT {
		// @ts-ignore
		constructor(type, content, auth, IAM) {
			this.type = type;
			this.IAM = IAM;
			this.auth = auth;
			this.content = content;
			this.ts = Date.now();
		}
	}

	// @ts-ignore
	let msgBox;
	// @ts-ignore
	let ws;
	let person = $page.url.searchParams.get('with') || {};
	let messages = [];
	function showMessage(msg) {
		messages.push(JSON.parse(msg));
		// @ts-ignore
		messages = messages; // Reactivity trigger
	}

	// Init
	// @ts-ignore
	async function init(ws) {
		ws.onopen = () => {
			console.log('Connection opened!');
			const Message = new msgFMT(0, null, token, UID);
			ws.send(JSON.stringify(Message)); // Login
		};
		ws.onmessage = ({ data }) => showMessage(data);
		ws.onclose = function () {
			ws = null;
		};
	}

	// sendMessage
	// @ts-ignore
	function sendMsg(event) {
		// @ts-ignore
		if (!ws) {
			showMessage('No WebSocket connection :(');
			return;
		}

		if (event.keyCode === 13) {
			// @ts-ignore
			if (msgBox.value === null || msgBox.value === undefined || msgBox.value === '') {
				return;
			} // @ts-ignore
			const Message = new msgFMT(1, msgBox.value);
			ws.send(JSON.stringify(Message));
			// @ts-ignore
			Message.IAM = true;
			showMessage(JSON.stringify(Message));
			// @ts-ignore
			msgBox.value = null;
			// Scroll down
			messageList_UI.scroll(0, messageList_UI.scrollHeight); // Overflow a bit
		}
	}
	// @ts-ignore
	function createRID(sender, reciever) {
		if (sender < reciever) {
			return parseInt(`${sender}${reciever}`);
		} else {
			return parseInt(`${reciever}${sender}`);
		}
	}

	onMount(() => {
		// Set user
		setUser(UID);
		// Fetch user
		fetch(`${http_host}${API_BASE}user/${person}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then((res) => {
				if (res.status != 200) {
					console.log('Shit happened. Going back...');
					history.back();
				}

				return res.json();
			})
			.then(function (json) {
				person = json;
				person = person;
				// @ts-ignore
				ws = new WebSocket(ws_host + `?RID=${person.ID}&guild=false`); // Get websocket and open a connection to a conversation_room.
				// This is a conversation and not a guild so we hardcode guild as being false
				init(ws); // Initialize client
			})
			.catch(function (res) {
				console.log(res);
			});
	});
</script>

<main>
	<div class="flex">
		<Sidebar avatar={userData.avatar} />

		<Channelbar>
			<svelte:fragment slot="title">Direct Messages</svelte:fragment>
			<svelte:fragment slot="channels"><MainChannel /></svelte:fragment>
		</Channelbar>

		<ContentContainer title={person.username || 'Loading'} icon={faMessage}>
			<div slot="content" class="h-screen w-full">
				<div class="chat-container h-4/5">
					<div
						bind:this={messageList_UI}
						class="message-list h-full"
						style="overflow: overlay; height: 100%; max-height: 87vh;"
					>
						{#each messages as message}
							{#if message.type === 0}
								<ServerMessage>{message.content}</ServerMessage>
							{:else if message.IAM}
								<UserMessage icon={person.avatar} floatLeft={true}>{message.content}</UserMessage>
							{:else}
								<UserMessage icon={person.avatar} floatLeft={false}>{message.content}</UserMessage>
							{/if}
						{/each}
					</div>
				</div>
				<div
					class="chat-form relative bottom-0 flex w-full items-center border-t border-white bg-primary pl-2"
				>
					<Fa icon={faPaperclip} class="mx-4 w-12" />
					<input
						bind:this={msgBox}
						on:keydown={(e) => sendMsg(e)}
						type="text"
						placeholder="Type a message"
						class="flex-1 rounded-sm border-2 border-blue-600 p-4 text-primary"
					/>
				</div>
			</div>
		</ContentContainer>
	</div>
</main>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
