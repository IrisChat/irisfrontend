<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faEyeSlash,
		faHome,
		faPhone,
		type IconDefinition
	} from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import voicecall, { init, endCall } from '$lib/xs/Ether/voicecall';
	import { getUser } from '$lib/xs/Ether/User/UID';
	export let icon: IconDefinition = faHome;
	export let noIcon: boolean = false;

	// Voicecall Hooks
	export let call: boolean = false;
	let callPane: HTMLDivElement;
	let Host: HTMLDivElement;
	let hostVideo: HTMLVideoElement;
	let Receiver: HTMLDivElement;
	let receiverVideo: HTMLVideoElement;
	let hostAudio: HTMLAudioElement;
	let receiverAudio: HTMLAudioElement;
	let person = $page.url.searchParams.get('with') || { ID: '' };

	// Read storage
	// @audit TopNav - Fix this
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
			init(hostVideo, hostAudio, receiverVideo, receiverAudio);
		}
	});
</script>

<div
	class="top-navigation z-50 m-0 flex h-16 w-full flex-row flex-wrap items-center bg-opacity-60 text-text shadow-lg"
>
	<div class="titlebar flex w-full justify-around px-4">
		<div class="pageTitle flex items-center justify-center">
			{#if !noIcon}
				<Fa {icon} size="18" />
			{/if}
			<div class="status-holder ml-2 inline">
				<h5 class="title-header text-xl font-semibold">
					<slot name="title-text">Home</slot>
				</h5>
				<h1 class="subtitle text-sm font-light">
					<slot name="subtitle-text" />
				</h1>
			</div>
		</div>
		<div class="spacer flex-1">&nbsp;</div>
		{#if call}
			<div class="phonecall flex items-center justify-center px-4">
				<button
					on:click={() => {
						// Ensure that the ID's are of the same type
						voicecall(person.ID.toString(), hostVideo, hostAudio, receiverVideo, receiverAudio);
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
			class="callContainer flex resize flex-wrap items-center justify-around overflow-auto overflow-y-hidden bg-text bg-opacity-90 py-4"
		>
			<div class="wrapper inline">
				<div class="people flex flex-wrap items-center justify-around">
					<div
						id="Host"
						bind:this={Host}
						class="Host mx-4 my-4 flex items-center justify-center overflow-hidden rounded bg-primary"
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
									style="width: 150px; height: 150px;"
									src={userData.avatar}
									alt={userData.username + "'s Avatar"}
								/>
							{/if}
						{/if}
						<audio bind:this={hostAudio} src="" muted={true} class="hidden" />
					</div>
					<div
						id="Receiver"
						bind:this={Receiver}
						class="Receiver mx-4 my-4 flex items-center justify-center overflow-hidden rounded bg-primary"
						style="width: 500px; height: 400px"
					>
						<video
							bind:this={receiverVideo}
							width="500px"
							on:loadedmetadata={() => {
								receiverVideo = receiverVideo;
							}}
							class="hidden"
						/>
						{#if receiverVideo}
							{#if receiverVideo.classList.contains('hidden')}
								<img
									class="rounded-full border-8 border-tertiary px-2 py-2"
									style="width: 150px; height: 150px;"
									src={person.avatar}
									alt={person.username + "'s Avatar"}
								/>
							{/if}
						{/if}

						<audio bind:this={receiverAudio} src="" class="hidden" />
					</div>
				</div>

				<div class="controls items-around flex justify-center py-4">
					<button
						class="mx-2 rounded-full bg-red-600 px-4 py-4 text-white hover:bg-red-800"
						on:click={endCall}
					>
						<Fa icon={faPhone} size="18" />
					</button>
					<button
						class="mx-2 rounded-full bg-blue-600 px-4 py-4 text-white hover:bg-blue-800"
						on:click={() => Host.classList.toggle('hidden')}
					>
						<Fa icon={faEyeSlash} size="18" />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
