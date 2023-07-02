<script lang="ts">
	import IconListSearch from '@tabler/icons-svelte/dist/svelte/icons/IconListSearch.svelte';
	import IconUsers from '@tabler/icons-svelte/dist/svelte/icons/IconUsers.svelte';
	export let content: string = 'CONTENT';
</script>

<!---
 @slotParam 'icon' Icon before header title
            'icon2' Icon in actionable button
-->
<div class="header-wrapper mb-4 flex h-fit w-full">
	<div
		class="searchbar mr-1 flex h-fit w-full flex-1 items-center rounded-md border border-NORD1 bg-NORD0 px-2 py-2 text-base font-medium text-NORD8"
	>
		<slot name="icon"><IconListSearch stroke={1} size={16} /></slot>
		<div class="content mx-4 uppercase">{content}</div>
	</div>
	<div
		class="friendslist-button mx-1 flex h-fit cursor-pointer items-center justify-center rounded-md border border-NORD1 bg-NORDFROST0 px-3 py-3 text-base font-medium text-NORD1 hover:opacity-90"
	>
		<slot name="icon2"><IconUsers stroke={1} size={16} /></slot>
	</div>
</div>
