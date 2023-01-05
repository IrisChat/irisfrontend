<script>
	import SidebarIcon from '$lib/Sidebar/SidebarIcon.svelte';
	import MetaIcon from '$lib/Sidebar/SidebarIcon__meta.svelte';
	import Divider from '$lib/Divider.svelte';
	import Fa from 'svelte-fa';
	import { faCompass, faPlus, faBoltLightning, faCog } from '@fortawesome/free-solid-svg-icons';
	export let avatar = false;
	import { defaultAvatar } from '$lib/js/config.json';
</script>

<div class="sidebar z-50 h-screen bg-opacity-75 shadow-lg">
	<div
		class="icon-wrapper flex h-fit
flex-col bg-opacity-100 px-2"
	>
		<a href="/app">
			<SidebarIcon>
				<svelte:fragment slot="icon">
					<img
						class="rounded-xl"
						src={avatar || defaultAvatar}
						alt="Profile Avatar ID"
					/></svelte:fragment
				>
				<svelte:fragment slot="text">YOU</svelte:fragment>
			</SidebarIcon>
		</a>
		<Divider />

		<a href="/room?id=100">
			<SidebarIcon>
				<svelte:fragment slot="icon">S</svelte:fragment>
				<svelte:fragment slot="text">S</svelte:fragment>
			</SidebarIcon>
		</a>
		<SidebarIcon>
			<svelte:fragment slot="icon">
				<Fa icon={faPlus} size="32" /></svelte:fragment
			>
			<svelte:fragment slot="text">ADD SERVER</svelte:fragment>
		</SidebarIcon>

		<SidebarIcon>
			<svelte:fragment slot="icon">
				<Fa icon={faBoltLightning} size="20" /></svelte:fragment
			>
			<svelte:fragment slot="text">DONATE</svelte:fragment>
		</SidebarIcon>
		<SidebarIcon>
			<svelte:fragment slot="icon">
				<Fa icon={faCompass} size="28" /></svelte:fragment
			>
			<svelte:fragment slot="text">ANNOUNCE</svelte:fragment>
		</SidebarIcon>

		<a href="/app/settings">
			<MetaIcon>
				<svelte:fragment slot="icon"><Fa icon={faCog} size="28" /></svelte:fragment>
			</MetaIcon></a
		>
	</div>
</div>
