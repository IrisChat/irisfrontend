<script>
	import Hero from '$lib/Hero.svelte';
	setTimeout(() => {
		// Some hack I guess
		location.href = '/app';
	}, 800);
</script>

<main>
	<Hero>
		<svelte:fragment slot="heading"
			><div class="text-xl font-light">Taking you there!</div></svelte:fragment
		>
		<svelte:fragment slot="caption">&nbsp;</svelte:fragment>
	</Hero>
</main>
