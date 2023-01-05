<script lang="ts">
	import TipContainer from '$lib/content/TipContainer.svelte';
	import TopNav from './TopNav.svelte';

	// Dependencies
	import {
		faBullhorn,
		faHome,
		faPlusCircle,
		faBoltLightning
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	export let icon = faHome;
	export let title = 'Home';

	// Read storage
	import 'node-localstorage/register';
	// Skip server compilation
	onMount(() => {
		if (localStorage.getItem('token') == null) {
			console.log('Shit happened. Redirecting to login...');
			window.location.href = '/auth';
		}
	});
</script>

<div class="content-container">
	<TopNav {icon}>
		<svelte:fragment slot="title-text">{title}</svelte:fragment>
	</TopNav>
	<div
		class="content flex h-screen flex-wrap items-center justify-center text-center dark:text-text"
		style="background: url('/pattern-dark.svg');"
	>
		<slot name="content">
			<div class="font-base basis-full text-center text-8xl text-text">
				Welcome to <div class="font-semibold">IRIS</div>
			</div>
			<div class="tips-divider flex w-fit flex-wrap items-center justify-center">
				<TipContainer icon={faPlusCircle}>
					<svelte:fragment slot="title">Create a server</svelte:fragment>
					<svelte:fragment slot="description"
						>Start by creating a server to interact with your friends!</svelte:fragment
					>
				</TipContainer>

				<TipContainer icon={faBullhorn}>
					<svelte:fragment slot="title">Give feedback on Iris</svelte:fragment>
					<svelte:fragment slot="description"
						>Join the Community Server to chat & ask questions.</svelte:fragment
					>
				</TipContainer>

				<TipContainer icon={faBoltLightning}>
					<svelte:fragment slot="title">Donate!</svelte:fragment>
					<svelte:fragment slot="description"
						>Support the project by donating via our Patreon page! Thanks in advance!</svelte:fragment
					>
				</TipContainer>

				<TipContainer icon={faPlusCircle}>
					<svelte:fragment slot="title">Create a server</svelte:fragment>
					<svelte:fragment slot="description" />
				</TipContainer>
			</div>
			<a href="#" class="basis-full text-option">Turn off homescreen effects</a>
		</slot>
	</div>
</div>
