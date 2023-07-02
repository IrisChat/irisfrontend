<script lang="ts">
	import UniversalLayout from '$lib/app/universal_layout.svelte';
	import FloatingNavigation from '$lib/app/FloatingNavigation.svelte';
	import DefaultGutter from '$lib/app/Defaults/DefaultGutter.svelte';
	import DefaultSideBar from '$lib/app/Defaults/DefaultSideBar.svelte';

	/***************************** THIS IS A STUB!!! -------------------*****/
	// Read storage -- TODO - Find a better way to do this
	import 'node-localstorage/register';
	let __username: any = localStorage.getItem('userData');
	__username = JSON.parse(__username) || ' ';
	__username = __username?.username;
	const username: string = __username;
	__username = undefined; // @ts-ignore
	let userData = JSON.parse(localStorage.getItem('userData')) || {};
	/***************************** THIS IS A STUB!!! -------------------*****/
</script>

<UniversalLayout>
	<svelte:fragment slot="gutter"><DefaultGutter /></svelte:fragment>
	<svelte:fragment slot="sidebar">
		<DefaultSideBar /></svelte:fragment
	>
	<!-- <svelte:fragment slot="interaction_pane">&nbsp;</svelte:fragment> -->
	<!-- <svelte:fragment slot="participant_panel"
		><div class="node-container flex h-full w-full bg-NORD2 text-center">
			&nbsp;
		</div></svelte:fragment
	> -->
	<svelte:fragment slot="navigation_overlay">
		<FloatingNavigation avatar={userData.avatar || '/pixel.png'} /></svelte:fragment
	>
</UniversalLayout>
