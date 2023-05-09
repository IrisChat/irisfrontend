<script lang="ts">
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/ChannelBar/MainChannel.svelte';
	import { faMessage } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { ws_host, SOCKET_BASE } from '$lib/xs/config.json';
	import { getUser } from '$lib/xs/Ether/User/UID';
	import { page } from '$app/stores';
	import { setUser } from '$lib/xs/userData';
	import { drop } from '$lib/xs/dropZone';
	import __preprocess from '$lib/xs/preprocessors/main';

	// Read storage
	import 'node-localstorage/register';
	import ServerMessage from '$lib/content/ServerMessage.svelte';
	import UserMessage from '$lib/content/UserMessage.svelte';
	// Socket.io
	import { io } from 'socket.io-client';
	import InputContainer from '$lib/chat/InputContainer.svelte';

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
			if (msg.type != 0) {
				msg.__preprocess = true;
				msg.content = __preprocess(msg.content);
			}
			messages.push(msg);
			messages = messages; // Reactivity trigger
			// Scroll down
			messageList_UI.scroll(0, messageList_UI.scrollHeight); // Overflow a bit
		} catch (error) {
			console.log(error, msg);
		}
	}

	// Init

	async function init(ws: any) {
		ws.on('disconnect', function (s: any) {
			console.log('Disconnected from global handler.'); // In the event that this ever happens.
			msgBox.value = "You can't send messages here";
			msgBox.disabled = true;
		});
		ws.on('connect', () => {
			console.log(`Connection opened with id ${ws.id}!`);
			msgBox.disabled = false;
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
					message.__preprocess = true;
					message.content = __preprocess(message.content);
					messages.push(message);
					messages = messages;
				});
				// Scroll down
				messageList_UI.scroll(0, messageList_UI.scrollHeight); // Overflow a bit
			} catch (error) {
				console.warn('BAD_MESSAGE FROM SERVER. WILL WAIT TILL NEXT MESSAGE TO RETRY');
			}
		});
		// ws.onclose = function () {
		// 	ws = null;
		// };
	}

	// sendMessage

	async function sendMsg(event: any, file: Boolean) {
		if (!ws) {
			showMessage('No WebSocket connection :(');
			return;
		}

		if (file) {
			event.stopPropagation();
			event.preventDefault();
			await drop(event)?.then((after) => {
				if (after != null) {
					ws.emit('message', JSON.stringify(after));
				}
			});

			// Clear the messagebox
			msgBox.value = '';
			// Scroll down
			messageList_UI.scroll(0, messageList_UI.scrollHeight); // Overflow a bit
			return;
		}

		if (event.key == 'Enter') {
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

	function createRID(sender: number, receiver: number) {
		if (sender < receiver) {
			return parseInt(`${sender}${receiver}`);
		} else {
			return parseInt(`${receiver}${sender}`);
		}
	}

	onMount(() => {
		// Set user
		setUser(UID);
		// Fetch user
		getUser(person)
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

		<ContentContainer title={person.username || 'Loading'} icon={faMessage} call={true}>
			<div slot="content" class="h-screen w-full">
				<div class="chat-container h-4/5">
					<div
						bind:this={messageList_UI}
						class="message-list h-full pr-4"
						style="overflow: overlay; max-height: 87vh;"
					>
						{#each messages as message}
							{#if message.type === 0}
								<ServerMessage>{message.content}</ServerMessage>
							{:else if message.type === 1 && message.IAM == UID}
								<UserMessage icon={userData.avatar} floatLeft={true}>
									{#if message.__preprocess}
										<div class="inline">{@html message.content}</div>
									{:else}
										{message.content}
									{/if}
									<div class="caption opacity-76 text-xs font-light">
										{new Date(message.ts).toLocaleString()}
									</div>
								</UserMessage>
							{:else if message.type === 1}
								<UserMessage icon={person.avatar} floatLeft={false}>
									{#if message.__preprocess}
										<div class="inline">{@html message.content}</div>
									{:else}
										{message.content}
									{/if}
									<div class="caption opacity-76 text-xs font-light">
										{new Date(message.ts).toLocaleString()}
									</div>
								</UserMessage>
							{:else if message.type === 2 && message.IAM == UID}
								<UserMessage icon={userData.avatar} floatLeft={true}>
									{message.description}
									{@html message.content}
									<div class="caption opacity-76 text-xs font-light">
										{new Date(message.ts).toLocaleString()}
									</div>
								</UserMessage>
							{:else if message.type === 2}
								<UserMessage icon={person.avatar} floatLeft={false}>
									{message.description}
									{@html message.content}
									<div class="caption opacity-76 text-xs font-light">
										{new Date(message.ts).toLocaleString()}
									</div>
								</UserMessage>
							{/if}
						{/each}
					</div>
				</div>

				<div
					class="chat-form relative bottom-0 flex w-full items-center border-t border-tertiary bg-main pl-2 text-left text-text outline-none focus:outline-none"
				>
					<InputContainer>
						<div
							class="input_container flex select-text items-center overflow-y-auto  overflow-x-hidden break-words"
							contenteditable="true"
							role="textbox"
							spellcheck="true"
							title="Type a message"
							style="user-select: text; white-space: pre-wrap; word-break: break-word; max-height: 100px"
						>
							<input
								bind:this={msgBox}
								class="focus-zero z-20 h-full w-full rounded-sm bg-transparent px-2 py-2 text-xl font-semibold text-text "
								on:dragover={(e) => e.preventDefault}
								on:drop={(e) => sendMsg(e, true)}
								on:keydown={(e) => {
									sendMsg(e, false);
									input_placeholder.innerHTML = '';
								}}
							/>
						</div>
					</InputContainer>
				</div>
			</div>
		</ContentContainer>
	</div>
</main>

<style>
	:global(body) {
		overflow: hidden;
	}
	.focus-zero:focus {
		outline: none;
	}
</style>
