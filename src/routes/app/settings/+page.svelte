<script>
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/Channels/MainChannel.svelte';
	import { faCog, faBrush } from '@fortawesome/free-solid-svg-icons';
	import Fa from "svelte-fa";
	const userData = JSON.parse(localStorage.getItem('userData')) || {};
</script>

<main>
	<div class="flex">
		<Sidebar avatar={userData.avatar} />
		<Channelbar>
			<svelte:fragment slot="title">Direct Messages</svelte:fragment>
			<svelte:fragment slot="channels"><MainChannel /></svelte:fragment>
		</Channelbar>

		<ContentContainer icon={faCog} title="Settings">
			<svelte:fragment slot="content">
				<div slot="content" class="h-screen w-full">
					<div class="chat-container h-4/5">
						<div
							class="message-list h-full"
							style="overflow: overlay; height: 100%; max-height: 87vh;"
						>
							<div class="settings-element bg-red-200 flex">
							<Fa icon={faBrush} />
							</div>
						</div>
					</div>
				</div></svelte:fragment
			>
		</ContentContainer>
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
