<script lang="ts">
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/ChannelBar/MainChannel.svelte';
	import { faMessage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { http_host, ws_host, API_BASE, SOCKET_BASE } from '$lib/js/config.json';
	import { page } from '$app/stores';
	import { setUser } from '$lib/js/userData';
	import Fa from 'svelte-fa';

	// Read storage
	import 'node-localstorage/register';
	import ServerMessage from '$lib/content/ServerMessage.svelte';
	import UserMessage from '$lib/content/UserMessage.svelte';
	// Socket.io
	import { io } from 'socket.io-client';

	// @ts-ignore
	const userData = JSON.parse(localStorage.getItem('userData')) || {};
	const token = localStorage.getItem('token');
	const UID = localStorage.getItem('UID');
	let title = 'Iris | Chat';
	let messageList_UI: HTMLDivElement;
	let messages: any[] = [];
	let msgBox: HTMLInputElement;
	let person = $page.url.searchParams.get('with') || {};
	let ws: any;

	class msgFMT {
		type = 0;
		IAM = 0;
		auth = '';
		content = '';
		ts = Date.now();
		constructor(type: number, content: any, auth: string, IAM: any) {
			this.type = type;
			this.IAM = IAM;
			this.auth = auth;
			this.content = content;
			this.ts = Date.now();
		}
	}

	function showMessage(msg: any) {
		try {
			messages.push(msg);
			messages = messages; // Reactivity trigger
		} catch (error) {
			console.log(error, msg);
		}
	}

	// Init

	async function init(ws: any) {
		ws.on('connect', () => {
			console.log(`Connection opened with id ${ws.id}!`);
			// @ts-ignore
			const Message = new msgFMT(0, null, token, UID);
			ws.emit('join-room', JSON.stringify(Message)); // Login
		});
		// @ts-ignore
		ws.on('message', async (data: any) => {
			try {
				console.log(JSON.parse(data));
				showMessage(JSON.parse(data));
			} catch (error) {
				console.warn('BAD_MESSAGE FROM SERVER. WILL WAIT TILL NEXT MESSAGE TO RETRY');
			}
		});

		ws.on('server-message', async (data: any) => {
			try {
				showMessage(JSON.parse(data));
			} catch (error) {
				console.warn('BAD_MESSAGE FROM SERVER. WILL WAIT TILL NEXT MESSAGE TO RETRY');
			}
		});

		ws.on('context-message', async (data: any) => {
			try {
				messages = [];
				data = JSON.parse(data);
				data.forEach((message: any) => {
					messages.push(message);
					messages = messages;
				});
			} catch (error) {
				console.warn('BAD_MESSAGE FROM SERVER. WILL WAIT TILL NEXT MESSAGE TO RETRY');
			}
		});
		// ws.onclose = function () {
		// 	ws = null;
		// };
	}

	// sendMessage

	function sendMsg(event: any) {
		if (!ws) {
			showMessage('No WebSocket connection :(');
			return;
		}

		if (event.keyCode === 13) {
			if (msgBox.value === null || msgBox.value === undefined || msgBox.value === '') {
				return;
			}
			// @ts-ignore
			const Message = new msgFMT(1, msgBox.value, null, UID);
			ws.emit('message', JSON.stringify(Message));

			showMessage(Message);

			// Clear the messagebox
			msgBox.value = '';
			// Scroll down
			messageList_UI.scroll(0, messageList_UI.scrollHeight); // Overflow a bit
		}
	}

	function createRID(sender: number, reciever: number) {
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
				title = `Iris | Chat with ${person.username}`;
				// @ts-ignore
				// ws = io(ws_host + `?RID=${person.ID}&guild=false`); // Get websocket and open a connection to a conversation_room.
				ws = io(ws_host, {
					path: SOCKET_BASE, // @ts-ignore
					query: { RID: person.ID }
				}); // Get websocket and open a connection to a conversation_room.
				// This is a conversation and not a guild so we hardcode guild as being false
				init(ws); // Initialize client
			})
			.catch(function (res) {
				console.log(res);
			});
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
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
						style="overflow: overlay; max-height: 87vh;"
					>
						{#each messages as message}
							{#if message.type === 0}
								<ServerMessage>{message.content}</ServerMessage>
							{:else if message.IAM == UID}
								<UserMessage icon={userData.avatar} floatLeft={true}>{message.content}</UserMessage>
							{:else}
								<UserMessage icon={person.avatar} floatLeft={false}>{message.content}</UserMessage>
							{/if}
						{/each}
					</div>
				</div>
				<div
					class="chat-form relative bottom-0 flex w-full items-center border-t border-tertiary bg-main pl-2 text-text"
				>
					<Fa icon={faPaperclip} class="mx-4 w-12" />
					<input
						bind:this={msgBox}
						on:keydown={(e) => sendMsg(e)}
						type="text"
						placeholder="Type a message"
						class="flex-1 rounded-sm border-2 border-tertiary p-4 text-primary"
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
