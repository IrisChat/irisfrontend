<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/Channels/MainChannel.svelte';
	import { faMessage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { http_host, ws_host } from '$lib/js/config.json';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';

	// Read storage
	import 'node-localstorage/register';
	import ServerMessage from '$lib/content/ServerMessage.svelte';
	import UserMessage from '$lib/content/UserMessage.svelte';
	const token = localStorage.getItem('token');
	const UID = localStorage.getItem('UID');

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

	let person = $page.url.searchParams.get('with');
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
			showMessage(JSON.stringify(Message));
			// @ts-ignore
			msgBox.value = null;
		}
	}

	onMount(() => {
		// Fetch user
		fetch(`${http_host}/api/v0/user/${person}`, {
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
				ws = new WebSocket(ws_host); // Get websocket
				init(ws); // Initialize client
			})
			.catch(function (res) {
				console.log(res);
			});
	});
</script>

<main>
	<div class="flex">
		<Sidebar />
		<Channelbar>
			<svelte:fragment slot="title">Direct Messages</svelte:fragment>
			<svelte:fragment slot="channels"><MainChannel /></svelte:fragment>
		</Channelbar>
		<ContentContainer title={person.username || 'Loading'} icon={faMessage}>
			<div slot="content" class="h-full w-full">
				<div class="chat-container">
					<div class="message-list h-full">
						{#each messages as message}
							{#if message.type === 0}
								<ServerMessage>{message.content}</ServerMessage>
							{:else}
								<UserMessage>{message.content}</UserMessage>
							{/if}
						{/each}

						<!-- {messages} -->
					</div>
				</div>
				<div class="chat-form flex w-full items-center border-t border-white bg-primary pl-2">
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
