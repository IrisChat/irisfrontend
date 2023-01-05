<script>
	import { faHome } from '@fortawesome/free-solid-svg-icons';
	export let icon = faHome;
	import Fa from 'svelte-fa';
</script>

<div
	class="settings-element mr-4 my-4 flex w-full cursor-pointer items-center justify-center rounded-md bg-secondary bg-opacity-10 py-4 pl-2 pr-4 text-left hover:opacity-80"
>
	<div class="icon flex flex-1 items-center justify-center px-4 py-2">
		<Fa {icon} size="32" />
	</div>
	<div class="body flex flex-1 flex-wrap">
		<div class="w-fit basis-full text-2xl font-bold"><slot name="title">slot=title</slot></div>
		<div class="max-w-52 w-fit text-sm font-light">
			<slot name="description">slot=description</slot>
		</div>
	</div>
	<div class="flex flex-1 items-center justify-center">
		<slot name="action" />
	</div>
</div>

<style>
	.settings-element:hover {
		backdrop-filter: blur(2.5px);
		filter: blur(0.5px);
	}
</style>
