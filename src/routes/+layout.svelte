<script lang="ts">
	import '../tailwind.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	const options = {
		dismissable: true,
		theme: {
			'--toastBackground': '#000102',
			'--toastColor': 'white',
			'--toastBarBackground': '#008fff'
		}
	};

	onMount(() => {
		// Preference watcher
		let preferences: any = localStorage.getItem('preferences');
		preferences = JSON.parse(preferences);

		switch (preferences.theme) {
			case 'light':
				console.log('light');
				break;
			case 'dark':
				console.log('dark'); // @ts-ignore
				document.getElementById('rootOverrides').innerHTML = `
				:root {
					/* Removed */
				}`;
				break;
			default:
				break;
		}
	});
</script>

<SvelteToast {options} />
<slot />

<style>
	:global(blockquote) {
		margin: 0;
		border-left: 3px solid #efefefef;
		padding-left: 3px;
		border-radius: 3px;
		opacity: 80%;
		font-weight: 800;
	}

	:global(::-webkit-resizer) {
		display: initial;
		width: 100px;
		height: 100px;
		/* background: url('./grid-5.svg');
		::-webkit-resizer {
 		background-size: contain; */
		background: #ff7600ed;
	}
</style>
