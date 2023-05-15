<script>
	import Fa from 'svelte-fa';
	import { faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
	export let icon = faPrescriptionBottleMedical;
</script>

<div
	class="locator flex w-full justify-center items-center rounded-md py-2 px-2 hover:bg-gray-700 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	{#if icon === faPrescriptionBottleMedical}
		<slot name="icon" />
	{:else}
	<Fa {icon} size="20" class="opacity-70 dark:text-text" />
	{/if}
	
</div>
