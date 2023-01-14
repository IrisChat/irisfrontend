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
					--color-main: 0 0 0;  /* Primary */
					--color-primary: 28 28 28;  /* Secondary */
					--color-secondary: 45 130 183;  /* Extra */
					--color-tertiary: 235 138 144;  /* Extra */
					--color-option: 66 226 184;  /* Extra */
					--color-text: 217 217 217;  /* Tertiary */
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
</style>
