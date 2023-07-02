<script lang="ts">
	import IconListSearch from '@tabler/icons-svelte/dist/svelte/icons/IconListSearch.svelte';
	import GenericNavHeader from '../GenericNavHeader.svelte';
	import IconUsers from '@tabler/icons-svelte/dist/svelte/icons/IconUsers.svelte';
	import DirectMessageHistory from '../Trackers/DirectMessageHistory.svelte';
	import IconMessage2Down from '@tabler/icons-svelte/dist/svelte/icons/IconMessage2Down.svelte';
	import IconPlus from '@tabler/icons-svelte/dist/svelte/icons/IconPlus.svelte';
	import IconHash from '@tabler/icons-svelte/dist/svelte/icons/IconHash.svelte';
	import GenericMoreElement from '$lib/Global/GenericMoreElement.svelte';

	let channelList: HTMLDivElement;
</script>

<div class="node-container flex h-full w-full bg-NORD2 text-center">
	<div class="m-4 block h-full w-full">
		<div class="header-wrapper mb-8 flex h-fit w-full">
			<div
				class="searchbar mr-1 flex h-fit w-full flex-1 items-center justify-center rounded-md border border-NORD7 bg-NORD3 px-2 py-2 text-base font-medium text-NORD8"
			>
				<IconListSearch stroke={1} size={16} />
				<input
					type="text"
					class="mx-4 w-full flex-1 bg-transparent focus:outline-none"
					placeholder="Search chats, guilds, contacts..."
				/>
			</div>
			<div
				class="friendslist-button mx-1 flex h-fit cursor-pointer items-center justify-center rounded-md border border-NORD7 bg-NORD3 px-3 py-3 text-base font-medium text-NORD8 hover:bg-NORD2"
			>
				<IconUsers stroke={1} size={16} />
			</div>
		</div>
		<DirectMessageHistory />

		<!-- Guilds Section -->
		<div class="channelmessage-selection my-4 block">
			<GenericNavHeader content="Guilds">
				<svelte:fragment slot="icon">
					<IconMessage2Down stroke={1} size={20} />
				</svelte:fragment>
				<svelte:fragment slot="icon2"><IconPlus stroke={1} size={16} /></svelte:fragment>
			</GenericNavHeader>

			<div class="message_list max-h-60 overflow-y-hidden" bind:this={channelList}>
				<div
					class="guild-channel my-2 flex h-fit w-full cursor-pointer items-center rounded-md py-4 px-2 text-NORD7 hover:bg-NORD4 hover:text-NORD6"
				>
					<div class="icon flex items-center justify-center">
						<IconHash stroke={1} size={20} />
					</div>
					<div class="content mx-4 text-sm font-medium text-NORD8">Art</div>
				</div>
				<div
					class="generic-more-element-wrapper"
					on:keydown={() => channelList.classList.toggle('max-h-full')}
					on:click={() => channelList.classList.toggle('max-h-full')}
				>
					<GenericMoreElement />
				</div>
			</div>
			<!-- [END]::Guilds Section -->
		</div>
	</div>
</div>
