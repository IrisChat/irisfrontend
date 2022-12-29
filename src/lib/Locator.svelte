<script>
	import Fa from 'svelte-fa';
	import { faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
	export let icon = faPrescriptionBottleMedical;
</script>

<div
	class="locator w-full flex py-3 px-2 rounded-md hover:bg-gray-700 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	{#if icon === faPrescriptionBottleMedical}
		<slot name="icon" />
	{:else}
		<Fa {icon} size="20" class="pr-4 mt-1 dark:text-gray-400" />
	{/if}
	<h5 class="dropdown-header-text dark:text-gray-300"><slot name="header-text">slot=header-text</slot></h5>
	<div class="whitespace my-auto ml-auto" />
</div>
