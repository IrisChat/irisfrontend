<script lang="ts">
	import Fa from 'svelte-fa';
	import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import voicecall from '$lib/xs/Ether/voicecall';
	export let icon = faHome;
	
	// Voicecall Hooks
	export let call = false;
	let callPane: HTMLDivElement;
	let hostVideo: HTMLVideoElement;
	let recieverVideo: HTMLVideoElement;
	const person = $page.url.searchParams.get('with') || {};
</script>

<div
	class="top-navigation m-0 flex flex-wrap h-16 w-full flex-row items-center bg-opacity-60 text-text shadow-lg z-50"
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
					on:click={()=>{callPane.classList.remove("hidden");voicecall(person, hostVideo, recieverVideo)}}
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
	
	<div class="callPane bg-red-900 h-full w-full basis-full" bind:this={callPane}>
	<div class="flex callContainer">
	<div class="rounded bg-primary"><video bind:this={hostVideo} src=""></video></div>
	<div class="rounded bg-primary"><video bind:this={recieverVideo} src=""></video></div>
	</div>
	
	</div>
</div>
