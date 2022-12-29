<script>
	import SidebarIcon from '$lib/SidebarIcon.svelte';
	import Divider from '$lib/Divider.svelte';
	import Fa from 'svelte-fa';
	import { faCompass, faPlus, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
</script>

<div
	class="fixed top-0 left-0 flex h-screen w-16 flex-col
bg-white shadow-lg dark:bg-black"
>
	<SidebarIcon>
		<svelte:fragment slot="icon">
			<img class="rounded-xl" src="./pfp.jfif" alt="Profile Avatar ID" /></svelte:fragment
		>
		<svelte:fragment slot="text">YOU</svelte:fragment>
	</SidebarIcon>

	<Divider />

	<SidebarIcon>
		<svelte:fragment slot="icon">S</svelte:fragment>
	</SidebarIcon>
	<SidebarIcon>
		<svelte:fragment slot="icon">
			<Fa icon={faPlus} size="32" /></svelte:fragment
		>
	</SidebarIcon>

	<SidebarIcon>
		<svelte:fragment slot="icon">
			<Fa icon={faBoltLightning} size="20" /></svelte:fragment
		>
	</SidebarIcon>
	<SidebarIcon>
		<svelte:fragment slot="icon">
			<Fa icon={faCompass} size="28" /></svelte:fragment
		>
	</SidebarIcon>
</div>
