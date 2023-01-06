<script>
	export let background = 'yellow-900';
	export let text = 'yellow-300';
</script>

<div class="imports hidden bg-yellow-900 text-yellow-300" />
<div class="server-message flex flex-wrap items-center justify-center">
	<div
		class="smsg-content mx-2 my-2 max-w-md rounded bg-{background} bg-opacity-60 px-4 py-2 font-medium text-text text-{text}"
	>
		<div class="flex-1">
			<div class="whitespace-pre-wrap break-words">
				<slot />
			</div>
		</div>
	</div>
</div>
