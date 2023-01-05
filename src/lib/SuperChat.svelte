<script lang="ts">
	import Sidebar from '$lib/Sidebar/Sidebar.svelte';
	// @ts-ignore
	const userData = JSON.parse(localStorage.getItem('userData')) || {};
</script>

<div class="flex">
	<Sidebar avatar={userData.avatar}/>
	<slot name="content">slot=content</slot>
	<slot name="channels">slot=channels</slot>
</div>
