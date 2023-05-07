<script>
	import { onMount } from 'svelte';

	let loader;
	let Component;

	onMount(async () => {
		await new Promise((f) => setTimeout(f, 3500)); // Simulate a delay
		Component = (await loader()).default;
	});

	export { loader as this };
</script>

<svelte:component this={Component} {...$$restProps}>
	<slot />
</svelte:component>

{#if !Component}
	<slot name="fallback" />
{/if}
