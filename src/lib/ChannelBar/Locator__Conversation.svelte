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
	import Conversation from '../Conversation.svelte';
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
	class="locator__conversations flex w-full select-none flex-wrap rounded-md py-3 px-2 hover:bg-gray-700 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	<div class="runner flex w-full basis-full">
		<h5 class="dropdown-header-text dark:text-text">
			<slot name="header-text">slot=header-text</slot>
		</h5>

		<div class="iconHolder relative z-50 flex flex-1 items-center justify-end">
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				class="w-fit rounded-full px-1 py-1 hover:bg-gray-700 hover:bg-opacity-50 hover:backdrop-blur-sm"
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
										class="mt-2 mb-2 w-12 rounded-full bg-gray-700"
										src={convo.avatar || defaultAvatar}
										alt="Profile Avatar"
									/>
								</svelte:fragment>
								<svelte:fragment slot="header-text"
									>{convo.username || 'Deleted User'}
									<div class="aboutme text-sm font-light">
										{#if convo.about.length > 60}
											{(convo.about = convo.about.substring(0, 30) + '...')}
										{:else}
											{convo.about || 'This user has been deleted'}
										{/if}
									</div></svelte:fragment
								>
							</Conversation>
						</div>
					{/each}
				</div>
			</span>
		</div>
	</div>
	<div class="converations basis-full">
		<slot name="conversations">
			<div class="convo-title opacity-35 mb-4 basis-full text-sm dark:text-text">
				<slot name="title">This is where you contact your friends.</slot>
			</div>
			<div class="convo_wrap overflow-auto" style="max-height: 64vh; padding-bottom: 20px">
				{#each conversations as convo, i}
					<div
						class="wrap"
						on:click={() => (window.location.href = `/chat?with=${convo.ID}`)}
						on:keypress={() => (window.location.href = `/chat?with=${convo.ID}`)}
					>
						<Conversation status={convo.status}>
							<svelte:fragment slot="icon">
								<img
									class="mt-2 mb-2 w-12 rounded-full bg-gray-700"
									src={convo.avatar || defaultAvatar}
									alt="Profile Avatar"
								/>
							</svelte:fragment>
							<svelte:fragment slot="header-text"
								>{convo.username || 'Deleted User'}
								<div class="aboutme text-sm font-light">
									{#if convo.about != undefined}
										{#if convo.about.length > 60}
											{(convo.about = convo.about.substring(0, 30) + '...')}
										{:else}
											{convo.about}
										{/if}
									{:else}
										This user has been deleted
									{/if}
								</div></svelte:fragment
							>
						</Conversation>
					</div>
				{/each}
			</div>
		</slot>
	</div>
</div>

<style>
	:global(.dismiss_creator) {
		filter: blur(2px);
		opacity: 40%;
		transition: all 150ms ease-in;
	}
</style>
