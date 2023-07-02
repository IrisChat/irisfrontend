<script lang="ts">
	import UniversalLayout from '$lib/app/universal_layout.svelte';
	import FloatingNavigation from '$lib/app/FloatingNavigation.svelte';
	import DefaultGutter from '$lib/app/Defaults/DefaultGutter.svelte';
	import DefaultSideBar from '$lib/app/Defaults/DefaultSideBar.svelte';
	import Message from '$lib/app/InteractiveModal/Message.svelte';
	import MessageUI from '$lib/app/Message.svelte';

	/*********** REFACTOR */
	import { onMount } from 'svelte';
	import { ws_host, SOCKET_BASE, defaultAvatar } from '$lib/xs/config.json';
	import { getUser } from '$lib/xs/Ether/User/UID';
	import { page } from '$app/stores';
	import { setUser } from '$lib/xs/userData';
	import { drop } from '$lib/xs/dropZone';
	import __preprocess from '$lib/xs/preprocessors/main';

	// Read storage
	import 'node-localstorage/register';
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
	let person = $page.params.slug || {};
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
			setTimeout(() => {
				messageList_UI.scroll(0, messageList_UI.scrollHeight + 9999999); // Overflow a bit
			}, 100); // Requires timeout for some reason --- TODO: Use reactivity instead
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
	/*********** [END]:REFACTOR */
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<UniversalLayout>
	<svelte:fragment slot="gutter"><DefaultGutter /></svelte:fragment>
	<svelte:fragment slot="sidebar">
		<DefaultSideBar /></svelte:fragment
	>
	<svelte:fragment slot="interaction_pane"
		><div class="node-container relative flex h-full w-full bg-NORD2 text-center">
			<div class="block h-full w-full">
				<div class="header-wrapper mb-8 flex h-fit w-full">
					<div
						class="header flex h-fit w-full flex-1 items-center justify-center border-b border-NORD2 bg-NORD3 px-4 text-base font-medium text-NORD8"
					>
						<MessageUI
							username={person.username || 'Loading'}
							preview={person.about || 'Loading about me...'}
							status={person.status}
							icon={person.avatar || defaultAvatar}
							notification={false}
						/>
					</div>
				</div>
				<div
					bind:this={messageList_UI}
					class="chatList block h-full w-full overflow-y-auto overflow-x-hidden pb-48"
				>
					{#each messages as message}
						{#if message.type === 0}
							<Message content={message.content} icon="/wait.svg" username="WebSocket"
								><svelte:fragment slot="notification">{new Date().toLocaleString()}</svelte:fragment
								></Message
							>
						{:else if message.type === 1 && message.IAM == UID}
							<Message icon={userData.avatar} username={userData.username || 'Loading'}>
								<svelte:fragment slot="content">
									{#if message.__preprocess}
										<div class="inline">{@html message.content}</div>
									{:else}
										{message.content}
									{/if}
								</svelte:fragment>
								<div slot="notification">
									{new Date(message.ts).toLocaleString()}
								</div>
							</Message>
						{:else if message.type === 1}
							<Message icon={person.avatar} username={person.username || 'Loading'}>
								<svelte:fragment slot="content">
									{#if message.__preprocess}
										<div class="inline">{@html message.content}</div>
									{:else}
										{message.content}
									{/if}
								</svelte:fragment>
								<div slot="notification">
									{new Date(message.ts).toLocaleString()}
								</div>
							</Message>
						{:else if message.type === 2 && message.IAM == UID}
							<Message icon={userData.avatar}>
								<svelte:fragment slot="content">
									{message.description}
									{@html message.content}
								</svelte:fragment>
								<div slot="notification">
									{new Date(message.ts).toLocaleString()}
								</div>
							</Message>
						{:else if message.type === 2}
							<Message icon={person.avatar}>
								<svelte:fragment slot="content">
									{message.description}
									{@html message.content}
								</svelte:fragment>
								<div slot="notification">
									{new Date(message.ts).toLocaleString()}
								</div>
							</Message>
						{/if}
					{/each}
				</div>
			</div>
			<div class="fixed bottom-14 flex w-7/12 items-center justify-center">
				<div
					class="chat-form flex h-12 items-center rounded-full border border-NORD8 bg-NORD1 text-left text-base font-normal text-NORD8 focus:outline-none"
					style="width: 90%;"
				>
					<div class="flex h-full w-full items-center">
						<div
							class="input_container flex w-full select-text items-center overflow-y-auto overflow-x-hidden break-words"
							contenteditable="true"
							role="textbox"
							spellcheck="true"
							title="Type a message"
							style="user-select: text; white-space: pre-wrap; word-break: break-word; max-height: 100px"
						>
							<input
								bind:this={msgBox}
								class="z-20 h-full w-full bg-transparent  px-4 py-2 focus:outline-none"
								placeholder="Type a message..."
								on:dragover={(e) => e.preventDefault}
								on:drop={(e) => sendMsg(e, true)}
								on:keydown={(e) => {
									sendMsg(e, false);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</svelte:fragment>
	<!-- <svelte:fragment slot="participant_panel"
		><div class="node-container flex h-full w-full bg-NORD2 text-center">
			&nbsp;
		</div></svelte:fragment
	> -->
	<svelte:fragment slot="navigation_overlay">
		<FloatingNavigation avatar={userData.avatar || '/pixel.png'} /></svelte:fragment
	>
</UniversalLayout>
