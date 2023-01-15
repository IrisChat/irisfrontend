<script lang="ts">
	import Fa from 'svelte-fa';
	import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import voicecall, { init } from '$lib/xs/Ether/voicecall';
	export let icon = faHome;

	// Voicecall Hooks
	export let call = false;
	let callPane: HTMLDivElement;
	let hostVideo: HTMLVideoElement;
	let recieverVideo: HTMLVideoElement;
	let hostAudio: HTMLAudioElement;
	let recieverAudio: HTMLAudioElement;
	const person = $page.url.searchParams.get('with') || {};
	const UID = localStorage.getItem('UID');
	onMount(() => {
		// Create a new connection
		init(UID, hostVideo, hostAudio, recieverVideo, recieverAudio);
	});
</script>

<div
	class="top-navigation z-50 m-0 flex h-16 w-full flex-row flex-wrap items-center bg-opacity-60 text-text shadow-lg"
>
	<div class="titlebar flex w-full justify-around px-4">
		<div class="pageTitle flex items-center justify-center">
			<Fa {icon} size="18" />
			<h5 class="title-text">
				<slot name="title-text">Home</slot>
			</h5>
		</div>
		<div class="spacer flex-1">&nbsp;</div>
		{#if call}
			<div class="phonecall flex items-center justify-center px-4">
				<button
					on:click={() => {
						callPane.classList.remove('hidden');
						voicecall(person, hostVideo, hostAudio, recieverVideo, recieverAudio);
					}}
					class="rounded bg-gray-600 bg-opacity-20 px-4 py-2 hover:bg-opacity-40"
					><Fa icon={faPhone} size="18" /></button
				>
			</div>
		{/if}
		<div class="logout">
			<button
				class="rounded bg-red-800 px-4 py-2 font-semibold text-white hover:opacity-80"
				on:click={() => {
					localStorage.clear();
					window.location.reload();
				}}
			>
				Logout</button
			>
		</div>
	</div>

	<div id="callPane" class="callPane hidden h-full w-full basis-full bg-text bg-opacity-100" bind:this={callPane}>
		<div class="callContainer flex items-center justify-around bg-text bg-opacity-90 py-4">
			<div
				class="mx-4 flex items-center justify-center overflow-hidden rounded bg-primary"
				style="width: 500px; height: 400px"
			>
				<video bind:this={hostVideo} width="500px" muted={true} />

				<audio bind:this={hostAudio} src="" muted={true}/>
			</div>
			<div
				class="mx-4 flex items-center justify-center overflow-hidden rounded bg-primary"
				style="width: 500px; height: 400px"
			>
				<video bind:this={recieverVideo} width="500px" />
				<audio bind:this={recieverAudio} src="" />
			</div>
		</div>
	</div>
</div>
