<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/Channels/MainChannel.svelte';
	import { faMessage, faPaperclip } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { host } from '$lib/js/config.json';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';

	let person = $page.url.searchParams.get('with');

	onMount(() => {
		fetch(`${host}/api/v0/user/${person}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then((res) => res.json())
			.then(function (json) {
				person = json;
				person = person;
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
		<ContentContainer title={person.username || "Unknown User"} icon={faMessage}>
			<div slot="content" class="h-full w-full">
			<div class="chat-container">
			<div class="message-list">
			
			</div>
			</div>
				<div class="chat-form fixed bottom-0 flex w-full items-center border-t border-white bg-primary pl-2">
					<Fa icon={faPaperclip} class="mx-4 w-12" />
					<input
						type="text"
						placeholder="Type a message"
						class="flex-1 rounded-sm border-2 border-blue-600 p-4 text-primary"
					/>
				</div>
			</div>
		</ContentContainer>
	</div>
</main>
