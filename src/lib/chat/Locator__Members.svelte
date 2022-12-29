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
	class="locator__conversations w-full flex flex-wrap py-3 px-2 rounded-md hover:bg-gray-700 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	<div class="runner flex w-full basis-full">
		<h5 class="dropdown-header-text dark:text-white"><slot name="header-text">slot=header-text</slot></h5>
		<div
			class="iconHolder hover:bg-gray-700 hover:bg-opacity-50 hover:backdrop-blur-sm px-1 py-1 rounded-full my-auto ml-auto"
		>
			<Fa {icon} size="18" />
		</div>
	</div>
	<div class="converations basis-full">
		<slot name="conversations">
			<div class="convo-title basis-full text-sm mb-4 dark:text-gray-300">
				<slot name="title">This is who all is in the server with you.</slot>
			</div>
			<Conversation>
				<svelte:fragment slot="icon">
					<div class="h-12 w-12 mt-2 mb-2 rounded-full bg-gray-700" />
				</svelte:fragment>
				<svelte:fragment slot="header-text"
					><div class="bg-gray-700 h-8 w-48 rounded-full" /></svelte:fragment
				>
			</Conversation>
			<Conversation>
				<svelte:fragment slot="icon">
					<div class="h-12 w-12 mt-2 mb-2 rounded-full bg-gray-700" />
				</svelte:fragment>
				<svelte:fragment slot="header-text"
					><div class="bg-gray-700 h-8 w-48 rounded-full" /></svelte:fragment
				>
			</Conversation>
			<Conversation>
				<svelte:fragment slot="icon">
					<div class="h-12 w-12 mt-2 mb-2 rounded-full bg-gray-700" />
				</svelte:fragment>
				<svelte:fragment slot="header-text"
					><div class="bg-gray-700 h-8 w-48 rounded-full" /></svelte:fragment
				>
			</Conversation>
		</slot>
	</div>
</div>
