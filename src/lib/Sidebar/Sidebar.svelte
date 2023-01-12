<script lang="ts">
	import SidebarIcon from '$lib/Sidebar/SidebarIcon.svelte';
	import MetaIcon from '$lib/Sidebar/SidebarIcon__meta.svelte';
	import Divider from '$lib/Divider.svelte';
	import Fa from 'svelte-fa';
	import { faCompass, faPlus, faBoltLightning, faCog } from '@fortawesome/free-solid-svg-icons';
	export let avatar: any = false;
	import { defaultAvatar } from '$lib/xs/config.json';
	// Read storage
	import 'node-localstorage/register';
	let __username: any = localStorage.getItem('userData');
	__username = JSON.parse(__username) || ' ';
	__username = __username?.username;
	const username: string = __username;
	__username = undefined;

	// Color scheme
	import getPixels from 'get-pixels';
	import { extractColors } from 'extract-colors';
	let PixData__COLOURS: string = 'transparent';
	let avatar_ = avatar;

	$: if (/^(?:(ht|f)tp(s?)\:\/\/)?/.test(avatar_)) {
		avatar_ = 'https://cors-anywhere.fly.dev/' + avatar_;
	}
	// Reactive statement which waits for localstorage to load
	$: getPixels(avatar_, (err: any, pixels: any) => {
		if (!err) {
			const data = [...pixels.data];
			const width = Math.round(Math.sqrt(data.length / 4));
			const height = width;

			extractColors({ data, width, height })
				.then((data) => {
					console.log('[FLAIR] ACCENT PALETTE', data);
					PixData__COLOURS = data[1].hex;
				})
				.catch(console.log);
		} else {
			console.log(err);
		}
	});
</script>

<div class="sidebar z-50 h-screen bg-opacity-75 shadow-lg">
	<div
		class="icon-wrapper flex h-fit
flex-col bg-opacity-100 px-2"
	>
		<a href="/app">
			<SidebarIcon customColor={PixData__COLOURS}>
				<svelte:fragment slot="icon">
					<img
						class="rounded-xl"
						style="background: {PixData__COLOURS};"
						src={avatar || "/pixel.png"}
						alt="Profile Avatar ID"
					/></svelte:fragment
				>
				<svelte:fragment slot="text"
					>YOU {#if username}({username}){/if}</svelte:fragment
				>
			</SidebarIcon>
		</a>
		<Divider />

		<a href="/room?id=100">
			<SidebarIcon customColor={PixData__COLOURS}>
				<svelte:fragment slot="icon">S</svelte:fragment>
				<svelte:fragment slot="text">S</svelte:fragment>
			</SidebarIcon>
		</a>
		<SidebarIcon customColor={PixData__COLOURS}>
			<svelte:fragment slot="icon">
				<Fa icon={faPlus} size="32" /></svelte:fragment
			>
			<svelte:fragment slot="text">ADD SERVER</svelte:fragment>
		</SidebarIcon>

		<SidebarIcon customColor={PixData__COLOURS}>
			<svelte:fragment slot="icon">
				<Fa icon={faBoltLightning} size="20" /></svelte:fragment
			>
			<svelte:fragment slot="text">DONATE</svelte:fragment>
		</SidebarIcon>
		<SidebarIcon customColor={PixData__COLOURS}>
			<svelte:fragment slot="icon">
				<Fa icon={faCompass} size="28" /></svelte:fragment
			>
			<svelte:fragment slot="text">ANNOUNCE</svelte:fragment>
		</SidebarIcon>

		<a href="/app/settings">
			<MetaIcon customColor={PixData__COLOURS}>
				<svelte:fragment slot="icon"><Fa icon={faCog} size="28" /></svelte:fragment>
			</MetaIcon></a
		>
	</div>
</div>
