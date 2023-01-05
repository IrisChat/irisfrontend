<script lang="ts">
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/Channels/MainChannel.svelte';
	// @ts-ignore
	const userData = JSON.parse(localStorage.getItem('userData')) || {};
</script>

<main>
	<div class="flex">
		<Sidebar avatar={userData.avatar} />
		<Channelbar>
			<svelte:fragment slot="title">Direct Messages</svelte:fragment>
			<svelte:fragment slot="channels"><MainChannel /></svelte:fragment>
		</Channelbar>

		<ContentContainer />
	</div>
</main>

<style>
	:global(.channel-bar) {
		display: block;
	}
	:global(.content-container) {
		display: none;
	}
	@media (min-width: 768px) {
		:global(.content-container) {
			display: block;
		}
	}
</style>
