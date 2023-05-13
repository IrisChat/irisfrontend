<script lang="ts">
	import SidebarIcon from '$lib/Sidebar/SidebarIcon.svelte';
	import MetaIcon from '$lib/Sidebar/SidebarIcon__meta.svelte';
	import Divider from '$lib/Divider.svelte';
	import setStatus from '$lib/xs/Ether/status';
	import Fa from 'svelte-fa';
	import {
		faCompass,
		faPlus,
		faBoltLightning,
		faCog,
		faPencil,
		faCircle
	} from '@fortawesome/free-solid-svg-icons';
	export let avatar: any = false;
	let avatarEditor: HTMLSpanElement;
	// Read storage
	import 'node-localstorage/register';
	let __username: any = localStorage.getItem('userData');
	__username = JSON.parse(__username) || ' ';
	__username = __username?.username;
	const username: string = __username;
	__username = undefined; // @ts-ignore
	let userData = JSON.parse(localStorage.getItem('userData')) || {};

	// Color scheme
	import getPixels from 'get-pixels';
	import { extractColors } from 'extract-colors';
	let PixData__COLOURS: string = 'transparent';
	let avatar_ = avatar;

	$: if (/^(?:(ht|f)tp(s?)\:\/\/)?/.test(avatar_)) {
		avatar_ = 'https://cors.zimjs.com/' + avatar_;
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

	function openAvatarEditor(event: any) {
		event.preventDefault();
		event.stopPropagation();
		avatarEditor.style.top = event.clientY + 'px';
		avatarEditor.style.left = event.clientX + 'px';
		avatarEditor.classList.remove('hidden');
	}
</script>

<span
	bind:this={avatarEditor}
	on:focusout={() => {
		avatarEditor.classList.add('hidden');
	}}
	class="avatarEditor absolute z-50 m-0 flex hidden w-fit flex-wrap rounded bg-primary bg-opacity-100 px-5 py-2 text-left text-text"
>
	<div
		class="creator_wrapper creator_title flex flex-1 flex-wrap items-center justify-center text-sm font-semibold"
	>
		<button
			on:click={() => (window.location.href = '/app/settings')}
			class="flex items-center justify-center rounded border-white px-4 py-2 text-text hover:border hover:opacity-80"
		>
			<Fa icon={faPencil} />
			<div class="text px-2">Change Avatar</div>
		</button>

		<div class="buttonArray flex items-center justify-around">
			<button
				on:click={() => {
					setStatus('online', userData);
					userData = userData; // Trigger
				}}
				class="mx-2 ml-3 flex w-24 items-center justify-center rounded border border-white py-2 text-text hover:opacity-80"
			>
				<Fa icon={faCircle} class="text-green-400" />
				<div class="text px-2">Online</div>
			</button>
			<button
				on:click={() => {
					setStatus('offline', userData);
					userData = userData; // Trigger
				}}
				class="w-24hover:opacity-80 ml-1 mr-2 flex items-center justify-center rounded border border-white px-3 py-2 text-text hover:opacity-80"
			>
				<Fa icon={faCircle} class="text-yellow-400" />
				<div class="text px-2">Offline</div>
			</button>
			<button
				on:click={() => {
					setStatus('DnD', userData);
					userData = userData; // Trigger
				}}
				class="ml-1 mr-3 flex w-24 items-center justify-center rounded border border-white py-2 text-text hover:opacity-80"
			>
				<Fa icon={faCircle} class="text-red-400" />
				<div class="text px-2">DnD</div>
			</button>
		</div>
	</div>
</span>

<div class="sidebar z-40 h-screen bg-opacity-75 shadow-lg">
	<div
		class="icon-wrapper flex h-fit
flex-col bg-opacity-100 px-2"
	>
		<a
			href="/app"
			on:contextmenu={(e) => {
				openAvatarEditor(e);
			}}
		>
			<SidebarIcon customColor={PixData__COLOURS}>
				<svelte:fragment slot="icon">
					<div class="iconContainer h-full w-full">
						<img
							class="rounded-xl h-full w-full"
							style="background: {PixData__COLOURS};"
							src={avatar || '/pixel.png'}
							alt="Profile Avatar ID"
						/>
						{#if userData.status == 'online'}
							<span
								class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-green-400"
							>
								&nbsp;
							</span>
						{:else if userData.status == 'offline'}
							<span
								class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-yellow-400"
							>
								&nbsp;
							</span>
						{:else if userData.status == 'DnD'}
							<span
								class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-red-400"
							>
								&nbsp;
							</span>
						{:else}
							<span
								class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-gray-400"
							>
								&nbsp;
							</span>
						{/if}
					</div>
				</svelte:fragment>
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

<style>
	.avatarEditor {
		/* border-left: inset; */
		/* border-left-color: currentcolor; */
		border-bottom: double;
		border-right-width: medium;
		overflow: hidden;
	}
</style>
