<script lang="ts">
	export let gutter: Boolean = true;
	export let sidebar: Boolean = true;
	export let interaction_pane: Boolean = true;
	export let participant_panel: Boolean = true;
	export let navigation_overlay: Boolean = true;

	// Read storage
	import 'node-localstorage/register';
	import { onMount } from 'svelte';

	onMount(() => { // Redirect to login if the token expired or nonexistent
		if (localStorage.getItem('token') == null) {
			console.log('Shit happened. Redirecting to login...');
			window.location.href = '/auth';
		}
	});
</script>

<main class="inline-block overflow-hidden lg:h-full lg:w-full">
	<div class="wrapping flex flex-col lg:h-full">
		<!-- Removing the overflow visibility would cause some very serious layout issues. Do not touch, please. -->
		<div class="overflow-hidden lg:flex lg:h-full lg:w-full">
			{#if gutter}
				<div
					class="gutter lg:min-w-18 lg:max-w-18 lg:w-18 lg:flex lg:h-full lg:flex-col-reverse lg:overflow-x-hidden"
				>
					<slot name="gutter">GUTTER</slot>
				</div>
			{/if}
			{#if sidebar}
				<div
					class="sidebar lg:min-w-1/4 lg:max-w-1/4 overflow-x-hidden lg:h-full lg:w-1/4 lg:overflow-y-auto"
				>
					<slot name="sidebar">SIDEBAR</slot>
				</div>
			{/if}
			{#if interaction_pane}
				<div
					class="interaction-pane lg:min-w-3/4 lg:max-w-3/4 lg:h-full lg:w-3/4 lg:overflow-hidden"
				>
					<!-- Hide both otherwise it becomes weird -->
					<slot name="interaction_pane">
						<div
							class="placeholder_hint flex h-full w-full items-center justify-center text-center text-4xl font-semibold text-NORD8"
						>
							<div class="placeholder_hint__content block">
								<div class="title">Nothing Selected</div>
								<div class="subtitle text-xl font-light">Select a chat to get started.</div>
							</div>
						</div>
					</slot>
				</div>
			{/if}
			{#if participant_panel}
				<div class="participant-panel lg:min-w-1/4 lg:max-w-1/4 lg:h-full lg:w-1/4">
					<slot name="participant_panel"
						><div
							class="placeholder_hint flex h-full w-full items-center justify-center text-center text-2xl font-semibold text-NORD8"
						>
							<div class="placeholder_hint__content block">
								<div class="title">No Participants to show</div>
								<div class="subtitle text-base font-light">
									Select a chat to view who you're talking with.
								</div>
							</div>
						</div></slot
					>
				</div>
			{/if}
		</div>
		{#if navigation_overlay}
			<div class="sidebar lg:min-h-12 lg:h-12 lg:max-h-12 lg:w-full">
				<slot name="navigation_overlay">NAVIGATION</slot>
			</div>
		{/if}
	</div>
</main>

<style>
	* {
		/* outline: 1px solid red; */
	}
</style>
