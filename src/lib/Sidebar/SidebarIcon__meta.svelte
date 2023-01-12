<script lang="ts">
	export let customColor: string;
</script>

{#if customColor}
	<div class="sidebar-icon__meta" style="background: {customColor}">
		<slot name="icon" />
	</div>
{:else}
	<div class="sidebar-icon__meta">
		<slot name="icon" />
	</div>
{/if}
