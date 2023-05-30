<script lang="ts">
	import TipContainer from '$lib/content/TipContainer.svelte';
	import TopNav from './TopNav.svelte';

	// Dependencies
	import {
		faBullhorn,
		faHome,
		faPlusCircle,
		faBoltLightning,

		type IconDefinition

	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	export let icon: IconDefinition = faHome;
	export let title: string = 'Home';
	export let subtitle: string = '';
	export let noIcon: boolean = false;
	export let call = false;
	let content: HTMLDivElement;
	let content_container: HTMLDivElement;
	let tipCollection: HTMLDivElement;

	// Read storage
	import 'node-localstorage/register';
	// Skip server compilation
	onMount(() => {
		const preferences = JSON.parse(localStorage.getItem('preferences') || '{}');
		if (localStorage.getItem('token') == null) {
			console.log('Shit happened. Redirecting to login...');
			window.location.href = '/auth';
		}
		if (preferences.cbackground) {
			if (preferences.coverlay == 'false') {
				content.style.background = `url(${preferences.cbackground})`;
			}
			content_container.style.background = `url(${preferences.cbackground})`;
		}
		if (preferences.hfx == 'false') {
			try {
				tipCollection.classList.add('hidden');
			} catch (e) {
				console.info('Not on homescreen.');
			}
		}
	});
</script>

<div bind:this={content_container} class="content-container">
	<TopNav {icon} {call} {noIcon}>
		<svelte:fragment slot="title-text">{title}</svelte:fragment>
		<svelte:fragment slot="subtitle-text">{subtitle}</svelte:fragment>
	</TopNav>
	<div
		bind:this={content}
		class="content flex h-screen flex-wrap items-center justify-center text-center text-text"
		style="background: url('/pattern-dark.svg');"
	>
		<slot name="content">
			<div
				bind:this={tipCollection}
				class="tips-divider flex w-fit flex-wrap items-center justify-center"
			>
				<TipContainer icon={faPlusCircle}>
					<svelte:fragment slot="title">Create a server</svelte:fragment>
					<svelte:fragment slot="description"
						>Start by creating a server to interact with your friends!</svelte:fragment
					>
				</TipContainer>

				<a href="https://github.com/IrisChat/Iris/issues" target="_blank" rel="noreferrer">
					<TipContainer icon={faBullhorn}>
						<svelte:fragment slot="title">Give feedback on Iris</svelte:fragment>
						<svelte:fragment slot="description"
							>Join the Community Server to chat & ask questions.</svelte:fragment
						>
					</TipContainer></a
				>

				<a href="https://patreon.com/IrisChat" target="_blank" rel="noreferrer">
					<TipContainer icon={faBoltLightning}>
						<svelte:fragment slot="title">Donate!</svelte:fragment>
						<svelte:fragment slot="description"
							>Support the project by donating via our Patreon page! Thanks in advance!</svelte:fragment
						>
					</TipContainer></a
				>

				<TipContainer icon={faPlusCircle}>
					<svelte:fragment slot="title">Create a server</svelte:fragment>
					<svelte:fragment slot="description" />
				</TipContainer>
			</div>
			<!-- <a href="#" class="basis-full text-tertiary">Turn off homescreen effects</a> -->
		</slot>
	</div>
</div>
