<script lang="ts">
	import Loader from '$lib/Loader.svelte';
	import SplashScreen from '$lib/Splash.svelte';
</script>

<Loader this={() => import('$lib/app/application.svelte')}>
	<!-- <p>some slotted content</p> -->

	<p slot="fallback">
		<SplashScreen />
	</p>
</Loader>
