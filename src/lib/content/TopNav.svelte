<script lang="ts">
	import Fa from 'svelte-fa';
	import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import voicecall, { init } from '$lib/xs/Ether/voicecall';
	import { getUser } from '$lib/xs/Ether/User/UID';
	export let icon = faHome;

	// Voicecall Hooks
	export let call = false;
	let callPane: HTMLDivElement;
	let hostVideo: HTMLVideoElement;
	let recieverVideo: HTMLVideoElement;
	let hostAudio: HTMLAudioElement;
	let recieverAudio: HTMLAudioElement;
	let person = $page.url.searchParams.get('with') || { ID: '' };

	// Read storage
	import 'node-localstorage/register';
	const userData = JSON.parse(localStorage.getItem('userData')) || {};
	if (call) {
		getUser(person)
			.then(function (json) {
				person = json;
				person = person;
				console.log(person);
			})
			.catch((error) => {
				console.error('The user could not be found', error);
			});
	}
	onMount(() => {
		if (call) {
			// Create a new connection
			init(hostVideo, hostAudio, recieverVideo, recieverAudio);
		}
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
						voicecall(person.ID, hostVideo, hostAudio, recieverVideo, recieverAudio);
						callPane.classList.remove('hidden');
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

	<div
		id="callPane"
		class="callPane hidden h-full w-full basis-full bg-text bg-opacity-100"
		bind:this={callPane}
	>
		<div
			class="callContainer flex flex-wrap items-center justify-around bg-text bg-opacity-90 py-4"
		>
			<div
				class="mx-4 flex items-center justify-center overflow-hidden rounded bg-primary"
				style="width: 500px; height: 400px"
			>
				<video
					bind:this={hostVideo}
					width="500px"
					muted={true}
					on:loadedmetadata={() => {
						hostVideo = hostVideo;
					}}
					class="hidden"
				/>
				{#if hostVideo}
					{#if hostVideo.classList.contains('hidden')}
						<img
							class="rounded-full border-8 border-tertiary px-2 py-2"
							width="150px"
							src={userData.avatar}
							alt={userData.username + "'s Avatar"}
						/>
					{/if}
				{/if}
				<audio bind:this={hostAudio} src="" muted={true} class="hidden" />
			</div>
			<div
				class="mx-4 flex items-center justify-center overflow-hidden rounded bg-primary"
				style="width: 500px; height: 400px"
			>
				<video
					bind:this={recieverVideo}
					width="500px"
					on:loadedmetadata={() => {
						recieverVideo = recieverVideo;
					}}
					class="hidden"
				/>
				{#if recieverVideo}
					{#if recieverVideo.classList.contains('hidden')}
						<img
							class="rounded-full border-8 border-tertiary px-2 py-2"
							width="150px"
							src={person.avatar}
							alt={person.username + "'s Avatar"}
						/>
					{/if}
				{/if}

				<audio bind:this={recieverAudio} src="" class="hidden" />
			</div>
		</div>
	</div>
</div>
