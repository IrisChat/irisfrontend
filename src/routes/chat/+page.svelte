<script>
	import Sidebar from '$lib/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/Channels/MainChannel.svelte';
	import { faMessage } from '@fortawesome/free-solid-svg-icons';
</script>

<main>
	<div class="flex">
		<Sidebar />
		<Channelbar>
			<svelte:fragment slot="title">Direct Messages</svelte:fragment>
			<svelte:fragment slot="channels"><MainChannel /></svelte:fragment>
		</Channelbar>
		<ContentContainer title="h" icon={faMessage}>
			<svelte:fragment slot="content">placeholder</svelte:fragment>
		</ContentContainer>
	</div>
</main>
