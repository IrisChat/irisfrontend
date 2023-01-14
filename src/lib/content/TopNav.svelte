<script>
	import Fa from 'svelte-fa';
	import { faHome } from '@fortawesome/free-solid-svg-icons';
	export let icon = faHome;
</script>

<div
	class="top-navigation m-0 flex h-16 w-full flex-row items-center bg-opacity-60 text-text shadow-lg"
>
	<div class="titlebar flex w-full justify-around px-4">
		<div class="pageTitle flex justify-center items-center">
			<Fa {icon} size="18" />
			<h5 class="title-text">
				<slot name="title-text">Home</slot>
			</h5>
		</div>
		<div class="spacer flex-1">&nbsp;</div>
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
</div>
