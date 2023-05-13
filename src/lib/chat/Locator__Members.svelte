<script>
	// slot=title
	// slot=conversations
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	export let icon = faPlus;

	// Dependencies

	import Conversation from '$lib/Conversation.svelte';
</script>

<div
	class="locator__conversations flex w-full flex-wrap rounded-md py-3 px-2 hover:bg-gray-700 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	<div class="runner flex w-full basis-full">
		<h5 class="dropdown-header-text dark:text-white">
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
			<div class="convo-title mb-4 basis-full text-sm dark:text-gray-300">
				<slot name="title">This is who all is in the server with you.</slot>
			</div>
			<Conversation>
				<svelte:fragment slot="icon">
					<div class="mt-2 mb-2 h-12 w-12 rounded-full bg-gray-700" />
				</svelte:fragment>
				<svelte:fragment slot="header-text"
					><div class="h-8 w-48 rounded-full bg-gray-700" /></svelte:fragment
				>
			</Conversation>
			<Conversation>
				<svelte:fragment slot="icon">
					<div class="mt-2 mb-2 h-12 w-12 rounded-full bg-gray-700" />
				</svelte:fragment>
				<svelte:fragment slot="header-text"
					><div class="h-8 w-48 rounded-full bg-gray-700" /></svelte:fragment
				>
			</Conversation>
			<Conversation>
				<svelte:fragment slot="icon">
					<div class="mt-2 mb-2 h-12 w-12 rounded-full bg-gray-700" />
				</svelte:fragment>
				<svelte:fragment slot="header-text"
					><div class="h-8 w-48 rounded-full bg-gray-700" /></svelte:fragment
				>
			</Conversation>
		</slot>
	</div>
</div>
