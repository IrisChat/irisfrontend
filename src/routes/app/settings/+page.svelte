<!---					</div>
				</div></svelte:fragment
			>
		</ContentContainer>
	</div>
</main>

<style>
	:global(.channel-bar) {
		display: block;
	}
	:global(.content-container) {
		display: none;
	}
	@media (min-width: 768px) {
		:global(.content-container) {
			display: block;
		}
	}
</style> -->
<script lang="ts">
	import { onMount } from 'svelte';
	// This should render the friends list page in the future
	onMount(() => history.back()); // Lol
</script>

<!-- <script lang="ts">
	const VERSION = '__VERSION__';
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import Channelbar from '$lib/ChannelBar/Collapsed/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/ChannelBar/Collapsed/MainChannel.svelte';
	import SettingsElement from '$lib/content/SettingsElement.svelte';
	import { faBrush, faCog, faImage, faImages, faMessage } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import faSparkles from './icons/faSparkles';
	import { defaultAvatar } from '$lib/xs/config.json';
	// @ts-ignore
	const userData = JSON.parse(localStorage.getItem('userData')) || {}; // @ts-ignore
	const preferences = JSON.parse(localStorage.getItem('preferences')) || {}; // @ts-ignore
	const token = localStorage.getItem('token');
	import { http_host, API_BASE } from '$lib/xs/config.json';
	import ServerMessage from '$lib/content/ServerMessage.svelte';
	import ActionComponent from '$lib/ActionView/ActionComponent.svelte';
	import { onMount } from 'svelte';
	let errorSplash: HTMLDivElement;
	let successSplash: HTMLDivElement;
	let refreshAvatar_input: HTMLInputElement;
	let ActionOverlay: HTMLDivElement;
	let userName_input: HTMLInputElement;
	let aboutme_input: HTMLInputElement;

	class Preferences {
		theme: string = '';
		cbackground: string = '';
		coverlay: string = '';
		hfx: string = '';
		constructor(theme: string, cbackground: string, coverlay: string, hfx: string) {
			this.theme = theme;
			this.cbackground = cbackground;
			this.coverlay = coverlay;
			this.hfx = hfx;
		}
	}

	function refreshData(URL: string, body: object, data: string, input_selector: HTMLInputElement) {
		fetch(URL, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(body)
		})
			.then(async (res) => {
				console.log(res);
				const json: object = await res.json();
				res.status == 200
					? (() => {
							ActionOverlay.classList.add('hidden');
							// @ts-ignore
							userData[data] = input_selector.value;
							// Commit
							localStorage.setItem('userData', JSON.stringify(userData));
					  })()
					: (() => {
							errorSplash.classList.remove('hidden');
							ActionOverlay.classList.add('hidden');
					  })();
			})
			.catch(function (res) {
				console.log(res);
				errorSplash.classList.remove('hidden');
				ActionOverlay.classList.add('hidden');
			});
	}

	let themeElement: HTMLSelectElement;
	let cbackgroundElement: HTMLInputElement;
	let cbackgroundOverlayElement: HTMLSelectElement;
	let hfxElement: HTMLSelectElement;
	function saveSettings() {
		// Make a POST request to the API to save the settings
		const theme = themeElement.value;
		const cbackground = cbackgroundElement.value;
		const coverlay = cbackgroundOverlayElement.value;
		const hfx = hfxElement.value;
		fetch(`${http_host}${API_BASE}user/preferences/`, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(new Preferences(theme, cbackground, coverlay, hfx))
		})
			.then(async (res) => {
				console.log(res);
				const json: object = await res.json();
				// @ts-ignore
				localStorage.setItem('preferences', json.preferences);
				res.status == 200
					? successSplash.classList.remove('hidden')
					: errorSplash.classList.remove('hidden');
			})
			.catch(function (res) {
				console.log(res);
				errorSplash.classList.remove('hidden');
			});
	}

	// Restore settings
	onMount(() => {
		refreshAvatar_input.value = userData.avatar;
		userName_input.value = userData.username;
		userName_input.placeholder = 'Username';
		aboutme_input.value = userData.about;
		themeElement.value = preferences.theme;
		cbackgroundElement.value = preferences.cbackground;
		cbackgroundOverlayElement.value = preferences.coverlay;
		hfxElement.value = preferences.hfx;
		try {
			// @ts-ignore
			userName_input.setAttribute('size', userName_input.value.length); // @ts-ignore
			aboutme_input.setAttribute('size', aboutme_input.value.length);
		} catch (e) {
			// Nothing
		}
	});
</script>

<div class="action_overlay hidden select-none" bind:this={ActionOverlay}>
	<ActionComponent title="Set Your Avatar" description="Type in the URL of your avatar">
		<div class="inline">
			<input
				type="text"
				class="creator_input rounded border-2 border-text bg-transparent px-2 py-2 text-sm font-light text-text"
				bind:this={refreshAvatar_input}
				placeholder="Avatar URL"
			/>
			<button
				class="rounded-md bg-option px-4 py-2 text-text"
				on:click={() =>
					refreshData(
						`${http_host}${API_BASE}user/avatar/`,
						{
							avatar: refreshAvatar_input.value
						},
						'avatar',
						refreshAvatar_input
					)}>Set</button
			>
			<div class="block py-2">
				<button
					class="rounded-md bg-red-800 px-4 py-2 text-text"
					on:click={() => ActionOverlay.classList.add('hidden')}>Close</button
				>
			</div>
		</div>
	</ActionComponent>
</div>

<main>
	<div class="flex">
		<Sidebar avatar={userData.avatar} />
		<Channelbar>
			<svelte:fragment slot="title"><Fa icon={faMessage} size="20" /></svelte:fragment>
			<svelte:fragment slot="channels"><MainChannel /></svelte:fragment>
		</Channelbar>

		<ContentContainer icon={faCog} title={`Settings — Client v${VERSION}`}>
			<svelte:fragment slot="content">
				<div class="imports hidden bg-green-500 text-gray-500" />
				<div bind:this={errorSplash} class="hidden">
					<ServerMessage>There was an error</ServerMessage>
				</div>
				<div bind:this={successSplash} class="hidden">
					<ServerMessage background="green-500" text="white">Saved Successfully!</ServerMessage>
				</div>

				<div slot="settings" class="settings-container flex w-full items-center justify-center">
					<div class="h-screen">
						<!-- ProfileEditor -->
<!--			<div
							class="ProfileEditor settings-element my-4 mr-4 flex w-full items-center justify-center rounded-md bg-secondary bg-opacity-10 py-4 pl-2 pr-4 text-left hover:bg-opacity-20"
						>
							<div
								class="icon flex flex-1 cursor-pointer items-center justify-center px-4 py-2 text-center"
							>
								<div
									class="pfpcircle h-52 w-52 rounded-full bg-blue-500 hover:opacity-90"
									title="This is your profile photo. Change it how you like"
									on:click={() => ActionOverlay.classList.remove('hidden')}
									on:keydown={() => ActionOverlay.classList.remove('hidden')}
								>
									<img
										src={userData.avatar || defaultAvatar}
										alt="{userData.username + "'s" || 'User'} Avatar"
										class="h-full w-full rounded-full"
									/>
									<div class="remove_avatar py-2">
										<a
											href="#"
											on:click={() => {
												refreshAvatar_input.value = '';
												refreshData(
													`${http_host}${API_BASE}user/avatar/`,
													{
														avatar: refreshAvatar_input.value
													},
													'avatar',
													refreshAvatar_input
												);
											}}
											class="font-light text-tertiary underline">Remove Avatar</a
										>
									</div>
								</div>
							</div>

							<div class="body flex flex-1 flex-wrap">
								<div
									class="w-fit basis-full text-6xl font-bold"
									title="This is your username. We don't allow changing usernames at this time"
								>
									<input
										bind:this={userName_input}
										type="text"
										class="username bg-transparent"
										placeholder="Loading"
									/>
									<div
										class="id flex text-sm font-light"
										title="This ID will allow anyone on the server to find you"
									>
										<div class="prepend pr-1 font-semibold">ID:</div>
										{userData.ID}
									</div>
								</div>
								<div
									class="aboutme flex w-fit text-sm font-light"
									title="This is your bio. Use this to tell people something about yourself"
								>
									<div class="prepend pr-1 font-semibold">About me:</div>
									<input
										bind:this={aboutme_input}
										on:change={() =>
											refreshData(
												`${http_host}${API_BASE}user/about/`,
												{ aboutme: aboutme_input.value },
												'about',
												aboutme_input
											)}
										type="text"
										class="aboutme bg-transparent"
										placeholder="Hey there! I am using Iris."
									/>
								</div>
							</div>
						</div>
						<!-- ProfileEditor ENDS -->
<!--- Theme selection element STARTS -->
<!--				<SettingsElement icon={faBrush}>
							<svelte:fragment slot="title">Theme</svelte:fragment>
							<svelte:fragment slot="description"
								>Choose between dark and light theme</svelte:fragment
							>
							<svelte:fragment slot="action">
								<select
									class="rounded-sm border border-white bg-transparent px-4 py-2"
									bind:this={themeElement}
									on:change={() => {
										saveSettings();
										setTimeout(() => {
											window.location.reload();
										}, 800);
									}}
								>
									<option value="light" selected>Light</option>
									<option value="dark">Dark</option>
								</select>
							</svelte:fragment>
						</SettingsElement>
						<!--- Theme selection element ENDS -->
<!--- Chat background selection STARTS -->
<!--				<SettingsElement icon={faImage}>
							<svelte:fragment slot="title">Chat Background</svelte:fragment>
							<svelte:fragment slot="description"
								>Choose the background you want to use in chats
							</svelte:fragment>
							<svelte:fragment slot="action">
								<input
									class="rounded-sm border border-white bg-transparent px-4 py-2"
									type="text"
									bind:this={cbackgroundElement}
									on:change={() => {
										saveSettings();
										setTimeout(() => {
											window.location.reload();
										}, 800);
									}}
								/>
							</svelte:fragment>
						</SettingsElement>
						<!-- Chat background selection element ENDS -->
<!-- Chat background overlay selection element STARTS -->
<!--			<SettingsElement icon={faImages}>
							<svelte:fragment slot="title">Chat Background Overlay</svelte:fragment>
							<svelte:fragment slot="description"
								>Enable the pattern overlay on the chat</svelte:fragment
							>
							<svelte:fragment slot="action">
								<select
									class="rounded-sm border border-white bg-transparent px-4 py-2"
									bind:this={cbackgroundOverlayElement}
									on:change={() => {
										saveSettings();
										setTimeout(() => {
											window.location.reload();
										}, 800);
									}}
								>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							</svelte:fragment>
						</SettingsElement>
						<!-- Chat background overlay selection element ENDS -->
<!-- Homescreen effects selection element STARTS -->
<!--				<SettingsElement icon={faSparkles}>
							<svelte:fragment slot="title">Homescreen Effects</svelte:fragment>
							<svelte:fragment slot="description">Enable homescreen effects</svelte:fragment>
							<svelte:fragment slot="action">
								<select
									class="rounded-sm border border-white bg-transparent px-4 py-2"
									bind:this={hfxElement}
									on:change={() => {
										saveSettings();
										setTimeout(() => {
											window.location.reload();
										}, 800);
									}}
								>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							</svelte:fragment>
						</SettingsElement>
						<!-- Homescreen effects selection element ENDS -->
