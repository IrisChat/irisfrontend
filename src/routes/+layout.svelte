<script>
	import '../tailwind.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	const options = {
		dismissable: true,
		theme: {
			'--toastBackground': '#000102',
			'--toastColor': 'white',
			'--toastBarBackground': '#008fff'
		}
	};
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
