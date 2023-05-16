<script lang="ts">
	import { onMount } from 'svelte';

	let loader;
	let Component;
	export let timer: Number = 3500;

	onMount(async () => {
		await new Promise((f) => setTimeout(f, timer | 3500)); // Simulate a delay
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
