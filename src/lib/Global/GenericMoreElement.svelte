<script lang="ts">
	import IconChevronDown from '@tabler/icons-svelte/dist/svelte/icons/IconChevronDown.svelte';
	import IconChevronUp from '@tabler/icons-svelte/dist/svelte/icons/IconChevronUp.svelte';
	let clicked: Boolean = false;
</script>

<div
	class="generic-more-element my-4 flex h-fit w-fit cursor-pointer select-none text-NORD7 hover:text-NORD6"
	on:click={() => {
		clicked = clicked ? false : true;
		clicked = clicked;
	}}
	on:keydown={() => {
		clicked = clicked ? false : true;
		clicked = clicked;
	}}
>
	<div class="icon flex items-center justify-center">
		{#if clicked}
			<IconChevronUp stroke={1} size={20} />
		{:else}
			<IconChevronDown stroke={1} size={20} />
		{/if}
	</div>
	<div class="content text-sm font-normal">
		{#if clicked}
			LESS
		{:else}
			MORE
		{/if}
	</div>
</div>
