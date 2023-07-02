<script lang="ts">
	import IconMessage2Plus from '@tabler/icons-svelte/dist/svelte/icons/IconMessage2Plus.svelte';
	import Message from '$lib/app/Message.svelte';
	import Notification from '$lib/app/Notification.svelte';

	import GenericNavHeader from '../GenericNavHeader.svelte';
	import GenericMoreElement from '$lib/Global/GenericMoreElement.svelte';

	let messageList: HTMLDivElement;

	import 'node-localstorage/register';
	const token = localStorage.getItem('token');
	import { http_host, API_BASE, defaultAvatar } from '$lib/xs/config.json';
	import { onMount } from 'svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import IconPlus from '@tabler/icons-svelte/dist/svelte/icons/IconPlus.svelte';
	//@ts-ignore
	let conversations: any[] = [];
	let creator_input: any;
	let search_users: any[] = [];

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
		// creator_input.setAttribute('size', creator_input.getAttribute('placeholder').length);
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

<!-- Direct Messages Section -->
<div class="directmessage-selection my-4 block">
	<GenericNavHeader content="Direct Messages">
		<svelte:fragment slot="icon">
			<IconMessage2Plus stroke={1} size={20} />
		</svelte:fragment>
		<svelte:fragment slot="icon2"><IconPlus stroke={1} size={16} /></svelte:fragment>
	</GenericNavHeader>

	<div class="message_list max-h-60 overflow-y-hidden" bind:this={messageList}>
		{#each conversations as convo, i}
			<div
				class="wrap"
				on:click={() => (window.location.href = `/chat/${convo.ID}`)}
				on:keypress={() => (window.location.href = `/chat/${convo.ID}`)}
			>
				<Message
					icon={convo.avatar || defaultAvatar}
					username={convo.username || 'Deleted User'}
					preview={convo.about}
					status={convo.status}
					size={25}
				>
					<svelte:fragment slot="notification">10:35PM</svelte:fragment></Message
				>
			</div>
		{/each}
	</div>
	<div
		class="generic-more-element-wrapper"
		on:keydown={() => messageList.classList.toggle('max-h-full')}
		on:click={() => messageList.classList.toggle('max-h-full')}
	>
		<GenericMoreElement />
	</div>
</div>
<!-- [END]::Direct Messages Section -->
