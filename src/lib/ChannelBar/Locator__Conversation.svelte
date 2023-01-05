<script lang="ts">
	// slot=title
	// slot=conversations
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	export let icon = faPlus;
	// Dependencies

	import 'node-localstorage/register';
	const token = localStorage.getItem('token');
	const UID = localStorage.getItem('UID');
	import { http_host, API_BASE } from '$lib/js/config.json';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	//@ts-ignore
	let conversations: any[] = [];

	import Conversation from '../Conversation.svelte';
	onMount(() => {
		fetch(`${http_host}${API_BASE}conversations/${UID}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.toString()}`
			},
			method: 'GET'
		})
			.then((res) => {
				if (res.status === 400) {
					toast.push('You were signed out from another device. <br/>Redirecting to login screen.', {
						dismissable: false,
						theme: {
							'--toastBarBackground': 'red'
						}
					});

					setTimeout(() => {
						window.location.href = '/auth';
					}, 3250);
				}
				return res.json()
			})
			.then(function (json) {
				console.log(json);
				conversations = json;
				conversations = conversations; // Reactivity trigger
			})
			.catch(function (res) {
				console.log(res);
			});
	});
</script>

<div
	class="locator__conversations flex w-full flex-wrap rounded-md py-3 px-2 hover:bg-gray-700 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	<div class="runner flex w-full basis-full">
		<h5 class="dropdown-header-text dark:text-text">
			<slot name="header-text">slot=header-text</slot>
		</h5>
		<div
			class="iconHolder my-auto ml-auto rounded-full px-1 py-1 hover:bg-gray-700 hover:bg-opacity-50 hover:backdrop-blur-sm"
		>
			<Fa {icon} size="18" />
		</div>
	</div>
	<div class="converations basis-full">
		<slot name="conversations">
			<div class="convo-title opacity-35 mb-4 basis-full text-sm dark:text-text">
				<slot name="title">This is where you contact your friends.</slot>
			</div>
			{#each conversations as convo, i}
				<div
					class="wrap"
					on:click={() => (window.location.href = `/chat?with=${convo.ID}`)}
					on:keypress={() => (window.location.href = `/chat?with=${convo.ID}`)}
				>
					<Conversation>
						<svelte:fragment slot="icon">
							<img
								class="mt-2 mb-2 w-12 rounded-full bg-gray-700"
								src={convo.avatar}
								alt="Profile Avatar"
							/>
						</svelte:fragment>
						<svelte:fragment slot="header-text"
							>{convo.username}
							<div class="aboutme text-sm font-light">
								{#if convo.about.length > 60}
									{(convo.about = convo.about.substring(0, 30) + '...')}
								{:else}
									{convo.about}
								{/if}
							</div></svelte:fragment
						>
					</Conversation>
				</div>
			{/each}
		</slot>
	</div>
</div>
