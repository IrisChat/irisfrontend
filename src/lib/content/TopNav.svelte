<script>
	import Fa from 'svelte-fa';
	import { faHome } from '@fortawesome/free-solid-svg-icons';
	export let icon = faHome;
</script>

<div
	class="top-navigation m-0 flex h-16 w-full flex-row items-center bg-opacity-60 text-text shadow-lg"
>
	<div class="titlebar flex w-full px-4">
		<Fa {icon} size="18" class=" mt-1" />
		<h5 class="title-text">
			<slot name="title-text">Home</slot>
		</h5>
	</div>
</div>
