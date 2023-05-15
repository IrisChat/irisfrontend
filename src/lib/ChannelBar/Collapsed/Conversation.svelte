<script>
	export let status = 'online';
</script>

<div
	class="conversation flex w-fit cursor-pointer items-center justify-center rounded-md  py-1 hover:bg-opacity-40 hover:backdrop-blur-sm"
>
	<div class="container_generic">
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
</div>
