<script>
	import Sidebar from '$lib/Sidebar.svelte';

</script>

<div class="flex">
	<Sidebar />

	<slot name="content">slot=content</slot>
	
   <slot name="channels">slot=channels</slot>
</div>
