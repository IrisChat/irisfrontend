<script>
	import Fa from 'svelte-fa';
	import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	export let icon = faHome;
</script>

<div
	class="tip flex w-fit cursor-pointer flex-wrap items-center justify-center rounded-md pl-2 pr-4 py-4 mx-4 my-4 text-left hover:opacity-60"
	style="background: #1a1a1a;"
>
	<div class="icon px-4 py-2">
		<Fa {icon} size="32" />
	</div>
	<div class="body flex flex-wrap">
		<div class="w-fit basis-full text-xl font-bold"><slot name="title">slot=title</slot></div>
		<div class="w-52 text-xs font-light">
			<slot name="description">slot=description</slot>
		</div>
	</div>
	<div class="action px-2 py-2 hover:opacity-40">
		<Fa icon={faChevronRight} size="14" />
	</div>
</div>
