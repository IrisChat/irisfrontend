<script>
	export let status = 'online';
</script>

<div
	class="conversation flex w-full cursor-pointer items-center justify-center rounded-md hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	<div class="pl-2 pr-5">
		<div class="icon_wrap relative">
			<slot name="icon">slot=icon</slot>
			{#if status == 'online'}
				<span
					class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-green-400"
				>
					&nbsp;
				</span>
			{:else if status == 'offline'}
				<span
					class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-yellow-400"
				>
					&nbsp;
				</span>
			{:else if status == 'DnD'}
				<span
					class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-red-400"
				>
					&nbsp;
				</span>
			{:else}
				<span
					class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-gray-400"
				>
					&nbsp;
				</span>
			{/if}
		</div>
	</div>
	<h5 class="text-text"><slot name="header-text">slot=header-text</slot></h5>
	<div class="whitespace my-auto ml-auto" />
</div>
