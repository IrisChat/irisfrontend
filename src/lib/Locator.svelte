<script>
	import Fa from 'svelte-fa';
	import { faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
	export let icon = faPrescriptionBottleMedical;
</script>

<div
	class="locator flex w-full rounded-md py-3 px-2 hover:bg-gray-700 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	{#if icon === faPrescriptionBottleMedical}
		<slot name="icon" />
	{:else}
		<Fa {icon} size="20" class="mt-1 pr-4 opacity-70 dark:text-text" />
	{/if}
	<h5 class="dropdown-header-text opacity-80 hover:opacity-100 dark:text-text">
		<slot name="header-text">slot=header-text</slot>
	</h5>
	<div class="whitespace my-auto ml-auto" />
</div>
