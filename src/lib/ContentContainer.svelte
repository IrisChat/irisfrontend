<script>
	import Locator from '$lib/Locator.svelte';
	import TopNav from './TopNav.svelte';

	// Dependencies
	import { faHome, faAddressCard, faNoteSticky, faPlus } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="content-container">
	<TopNav />
	<div
		class="content flex flex-wrap justify-center items-center text-center h-screen dark:bg-black"
	>
		<div class="text-8xl font-bold text-white text-center basis-full">Welcome to IRIS</div>
		<div class="tips-divider flex flex-wrap rounded bg-gray-900 w-full">
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
