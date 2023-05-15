<script lang="ts">
	// slot=title
	// slot=conversations
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	export let icon = faPlus;
	// Dependencies

	import 'node-localstorage/register';
	const token = localStorage.getItem('token');
	import { http_host, API_BASE, defaultAvatar } from '$lib/xs/config.json';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	//@ts-ignore
	let conversations: any[] = [];
	let creator: any;
	let creator_input: any;
	let search_users: any[] = [];
	import Conversation from '$lib/ChannelBar/Collapsed/Conversation.svelte';
	onMount(() => {
		function pollContacts() {
			fetch(`${http_host}${API_BASE}conversations/`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token?.toString()}`
				},
				method: 'GET'
			})
				.then((res) => {
					if (res.status === 400) {
						toast.push(
							'You were signed out from another device. <br/>Redirecting to login screen.',
							{
								dismissable: false,
								theme: {
									'--toastBarBackground': 'red'
								}
							}
						);

						setTimeout(() => {
							localStorage.clear(); // Clear the localStorage
							window.location.href = '/auth';
						}, 3250);
					}
					return res.json();
				})
				.then(function (json) {
					console.log(json);
					conversations = json;
					conversations = conversations; // Reactivity trigger
				})
				.catch(function (res) {
					console.log(res);
				});
		}
		pollContacts();
		// Fit input box to placeholder size
		creator_input.setAttribute('size', creator_input.getAttribute('placeholder').length);
		setInterval(() => {
			pollContacts();
		}, 15000);
	});

	function findUsers() {
		fetch(`${http_host}${API_BASE}user/global/find/`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ username: creator_input.value, id: creator_input.value })
		})
			.then(async (res) => {
				const json = await res.json();
				search_users = [];
				search_users.push(json);
				search_users = search_users; // Trigger
				// console.log(res);
			})
			.catch(function (res) {
				console.log(res);
			});
	}
</script>

<div
	class="locator__conversations flex select-none flex-wrap items-center justify-center rounded-md py-3"
>
	<div class="runner flex w-fit basis-full">
		<div class="iconHolder relative z-50 flex flex-1 items-center justify-center">
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				class="w-fit rounded-full px-2 py-1 hover:bg-gray-700 hover:bg-opacity-50 hover:backdrop-blur-sm"
				on:click={creator.classList.toggle('hidden')}
				on:mouseover={() => creator.classList.add('dismiss_creator')}
				on:mouseleave={() => creator.classList.remove('dismiss_creator')}
				on:keydown={creator.classList.toggle('hidden')}
			>
				<Fa {icon} size="18" />
			</div>
			<span
				bind:this={creator}
				class="creator absolute left-36 top-5 m-0 hidden w-fit rounded bg-primary bg-opacity-100 px-4 py-4 text-text"
			>
				<div class="creator_wrapper py-4">
					<div bind:this={creator} class="creator_meta pb-4">
						<div class="creator_title text-xl font-semibold">Start a Conversation!</div>
						<div class="creator_description text-sm font-light">
							Start a conversation with someone you know
						</div>
					</div>
					<form
						on:submit={(event) => {
							event.preventDefault();
						}}
						action="#"
					>
						<input
							type="text"
							class="creator_input rounded border-2 border-text bg-transparent px-2 py-2 text-sm font-light text-text"
							on:keyup={findUsers}
							bind:this={creator_input}
							placeholder="Type in an ID and press enter to start"
						/>
					</form>
				</div>
				<div class="creator_users">
					{#each search_users as convo, i}
						<div
							class="wrap"
							on:click={() => (window.location.href = `/chat?with=${convo.ID}`)}
							on:keypress={() => (window.location.href = `/chat?with=${convo.ID}`)}
						>
							<Conversation status={convo.status}>
								<svelte:fragment slot="icon">
									<img
										class="mt-2 mb-2 h-8 w-8 rounded-full bg-gray-700"
										src={convo.avatar || defaultAvatar}
										alt="Profile Avatar"
									/>
								</svelte:fragment>
							</Conversation>
						</div>
					{/each}
				</div>
			</span>
		</div>
	</div>
	<div class="converations flex w-full items-center justify-center">
		<div class="convo_wrap overflow-auto" style="max-height: 64vh; padding-bottom: 20px">
			{#each conversations as convo, i}
				<div
					class="wrap rounded-md hover:opacity-90"
					on:click={() => (window.location.href = `/chat?with=${convo.ID}`)}
					on:keypress={() => (window.location.href = `/chat?with=${convo.ID}`)}
				>
					<Conversation status={convo.status}>
						<svelte:fragment slot="icon">
							<img
								class="mt-2 mb-2 h-8 w-8 rounded-full bg-gray-700"
								src={convo.avatar || defaultAvatar}
								alt="Profile Avatar"
							/>
						</svelte:fragment>
					</Conversation>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	:global(.dismiss_creator) {
		filter: blur(2px);
		opacity: 40%;
		transition: all 150ms ease-in;
	}
</style>
