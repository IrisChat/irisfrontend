<script>
	import SidebarIcon from '$lib/SidebarIcon.svelte';
	import Divider from '$lib/Divider.svelte';
	import Fa from 'svelte-fa';
	import { faCompass, faPlus, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
</script>

<div
	class="flex h-screen flex-col
px-2 shadow-lg bg-opacity-100 dark:bg-primary"
>
	<a href="/app">
		<SidebarIcon>
			<svelte:fragment slot="icon">
				<img class="rounded-xl" src="./pfp.jfif" alt="Profile Avatar ID" /></svelte:fragment
			>
			<svelte:fragment slot="text">YOU</svelte:fragment>
		</SidebarIcon>
	</a>
	<Divider />

	<a href="/chat?id=100">
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
</div>
