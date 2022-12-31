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
