<script>
	import Fa from 'svelte-fa';
	import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	export let icon = faHome;
</script>

<div
	class="tip flex w-fit max-w-lg cursor-pointer items-center justify-center rounded-md pl-2 pr-4 py-4 mx-4 my-4 text-left hover:opacity-80 bg-secondary bg-opacity-10"
>
	<div class="icon px-4 py-2">
		<Fa {icon} size="32" />
	</div>
	<div class="body flex flex-wrap">
		<div class="w-fit basis-full text-xl font-bold"><slot name="title">slot=title</slot></div>
		<div class="w-fit max-w-52 text-xs font-light">
			<slot name="description">slot=description</slot>
		</div>
	</div>
	<div class="action px-1 py-1 bg-gray-900 rounded-full hover:opacity-40">
		<Fa icon={faChevronRight} size="14" />
	</div>
</div>

<style>
.tip:hover{
	backdrop-filter: blur(2.5px);
	filter: blur(0.5px);
}
</style>