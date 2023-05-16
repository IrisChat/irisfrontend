<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCloud } from '@fortawesome/free-solid-svg-icons';

</script>

<main
	class="flex h-screen w-full select-none flex-col items-center justify-end overflow-hidden text-center"
	style="color: #2EC0F9"
>
	<div class="notification flex flex-1 flex-col items-center justify-end">
		<div class="notification-content inline-block">
			<div class="logo text-5xl font-semibold">Please wait...</div>
		</div>
	</div>
	<div
		class="troubleshooting-tips flex w-full flex-col items-center justify-end py-12 text-center text-sm font-extralight first-letter:h-full"
		style="flex: 0.75"
	>
		<div class="troubleshooting-tips-container inline-block">
			<div class="troubleshooting-tips-callout">Network issues? Try some of these:</div>
			<a href="/status" target="__blank">
				<div
					class="server-status-link mt-4 flex cursor-pointer items-center justify-center font-semibold hover:underline hover:opacity-90"
				>
					<Fa icon={faCloud} size="20" class="mx-2 mb-1" />Server Status
				</div></a
			>
		</div>
	</div>
</main>

<style>
	main {
		/* Local style */
		background: #191b1f;
	}
</style>
