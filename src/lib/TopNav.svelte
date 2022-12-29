<script>
	import Fa from 'svelte-fa';
	import { faHome } from '@fortawesome/free-solid-svg-icons';
	export let icon = faHome
</script>

<div
	class="top-navigation flex flex-row items-center bg-gray-300 dark:bg-gray-900 bg-opacity-90 w-full h-16 m-0 shadow-lg"
>
<div class="titlebar flex w-full px-4">
	<Fa icon={icon} size="18" class="text-gray-200 mt-1" />
	<h5 class="title-text text-gray-300">
	<slot name="title-text">Home</slot>
	</h5>
</div>
</div>