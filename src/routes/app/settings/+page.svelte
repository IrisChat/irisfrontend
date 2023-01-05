<script lang="ts">
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	import Channelbar from '$lib/Channelbar.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import MainChannel from '$lib/Channels/MainChannel.svelte';
	import SettingsElement from '$lib/content/SettingsElement.svelte';
	import { faBrush, faCog } from '@fortawesome/free-solid-svg-icons';
	// @ts-ignore
	const userData = JSON.parse(localStorage.getItem('userData')) || {};
	import { http_host } from '$lib/js/config.json';

	class Preferences {
		theme: string = '';
		constructor(theme: string) {
			this.theme = theme;
		}
	}

	let themeElement: any;
	function saveSettings() {
		// Make a POST request to the API to save the settings
		const theme = themeElement.value;
		fetch(`${http_host}user/preferences/${userData.UID}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(new Preferences(theme))
		})
			.then(function (res) {
				console.log(res);
			})
			.catch(function (res) {
				console.log(res);
			});
	}
</script>

<main>
	<div class="flex">
		<Sidebar avatar={userData.avatar} />
		<Channelbar>
			<svelte:fragment slot="title">Direct Messages</svelte:fragment>
			<svelte:fragment slot="channels"><MainChannel /></svelte:fragment>
		</Channelbar>

		<ContentContainer icon={faCog} title="Settings">
			<svelte:fragment slot="content">
				<div slot="settings" class="h-screen w-full">
					<SettingsElement icon={faBrush}>
						<svelte:fragment slot="title">Theme</svelte:fragment>
						<svelte:fragment slot="description">Choose between dark and light theme</svelte:fragment
						>
						<svelte:fragment slot="action">
							<select bind:this={themeElement} on:change={saveSettings}>
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
