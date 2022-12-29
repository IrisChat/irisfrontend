<script>
	import Locator from '$lib/Locator.svelte';
	import TopNav from './TopNav.svelte';

	// Dependencies
	import { faHome } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="content-container">
	<TopNav />
	<div
		class="content flex h-screen flex-wrap items-center justify-center text-center dark:bg-black"
	>
		<div class="basis-full text-center text-8xl font-bold text-white">Welcome to IRIS</div>
		<div class="tips-divider flex w-full flex-wrap rounded bg-gray-900">
			<Locator icon={faHome}>
				<svelte:fragment slot="header-text">Home</svelte:fragment>
			</Locator>
			<Locator icon={faHome}>
				<svelte:fragment slot="header-text">Home</svelte:fragment>
			</Locator>
			<Locator icon={faHome}>
				<svelte:fragment slot="header-text">Home</svelte:fragment>
			</Locator>
			<Locator icon={faHome}>
				<svelte:fragment slot="header-text">Home</svelte:fragment>
			</Locator>
			<Locator icon={faHome}>
				<svelte:fragment slot="header-text">Home</svelte:fragment>
			</Locator>
			<Locator icon={faHome}>
				<svelte:fragment slot="header-text">Home</svelte:fragment>
			</Locator>
		</div>
		<a href="#" class="basis-full" style="color: #f2616c">Turn off homescreen effects</a>
	</div>
</div>
