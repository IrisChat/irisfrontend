<script lang="ts">
	import NavigatorMin from '$lib/Navigator-Min.svelte';
	import { page } from '$app/stores';
	let error_apology: HTMLDivElement;

	console.log('Haha oh no-');
</script>

<main class="login h-screen w-full overflow-hidden text-white">
	<div class="content mx-16 flex flex-wrap items-center justify-center">
		<NavigatorMin />

		<div class="headline-greeting my-3 mt-7 inline-block text-left">
			<div class="text-md font-semibold uppercase" style="color: #0EC4DD">HOW EMBARRASSING...</div>
			<div bind:this={error_apology} class="my-2 text-5xl font-semibold text-white">
				{#if $page.status == 404}
					Sorry, looks like we couldn't find that one 😅
				{:else}
					Looks like we messed up 😅
				{/if}
			</div>
			<div class="my-4 text-sm font-semibold text-white">
				Technical details: HTTP_{$page.status} "{$page.error?.message}"
			</div>
			<div class="my-4 text-sm font-semibold text-white">
				Wanna go <a href="/" class="hover:underline" style="color: #0094FF">Home</a>?
			</div>
		</div>
	</div>
</main>

<style>
	.login {
		background-color: #191b1f; /* Fallback color */
		background-image: url('/images/login.png');
		background-position: center;
		/* background-size: contain; */
		/* background-repeat: no-repeat; */
		/* border-radius: 1vw; */
	}
</style>
