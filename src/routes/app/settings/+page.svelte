<script lang="ts">
	const VERSION = '__VERSION__';
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/ChannelBar/MainChannel.svelte';
	import SettingsElement from '$lib/content/SettingsElement.svelte';
	import { faBrush, faCog } from '@fortawesome/free-solid-svg-icons';
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
		constructor(theme: string) {
			this.theme = theme;
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

	let themeElement: any;
	function saveSettings() {
		// Make a POST request to the API to save the settings
		const theme = themeElement.value;
		fetch(`${http_host}${API_BASE}user/preferences/`, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(new Preferences(theme))
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
			<svelte:fragment slot="title">Direct Messages</svelte:fragment>
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
				<div slot="settings" class="h-screen">
					<!-- ProfileEditor -->
					<div
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
									class="rounded-full h-full w-full"
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
					<SettingsElement icon={faBrush}>
						<svelte:fragment slot="title">Theme</svelte:fragment>
						<svelte:fragment slot="description">Choose between dark and light theme</svelte:fragment
						>
						<svelte:fragment slot="action">
							<select
								bind:this={themeElement}
								on:change={() => {
									saveSettings();
									setTimeout(() => {
										window.location.reload();
									}, 800);
								}}
							>
								<option value="light">Light</option>
								<option value="dark">Dark</option>
							</select>
						</svelte:fragment>
					</SettingsElement>
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
</style>
