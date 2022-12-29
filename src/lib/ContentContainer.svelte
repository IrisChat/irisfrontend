<script>
	import TipContainer from '$lib/TipContainer.svelte';
	import TopNav from './TopNav.svelte';

	// Dependencies
	import { faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
	export let icon = faHome;
	export let title = 'Home';
</script>

<div class="content-container">
	<TopNav {icon}>
		<svelte:fragment slot="title-text">{title}</svelte:fragment>
	</TopNav>
	<div
		class="content flex h-screen flex-wrap items-center justify-center text-center dark:bg-black dark:text-white"
	>
		<slot name="content">
			<div class="basis-full text-center text-8xl font-base text-white">
				Welcome to <div class="font-semibold">IRIS</div>
			</div>
			<div class="tips-divider flex w-full flex-wrap rounded bg-red-200">
				<TipContainer icon={faPlusCircle}>
					<svelte:fragment slot="title">Create a server</svelte:fragment>
					<svelte:fragment slot="description"
						>Create a server to interact with your friends!</svelte:fragment
					>
				</TipContainer>
			</div>
			<a href="#" class="basis-full" style="color: #f2616c">Turn off homescreen effects</a>
		</slot>
	</div>
</div>
