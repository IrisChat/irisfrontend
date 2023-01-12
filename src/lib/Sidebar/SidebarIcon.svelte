<script lang="ts">
	export let customColor: string;
</script>

{#if customColor}
	<div class="sidebar-icon group text-tertiary" style="color: {customColor}">
		<slot name="icon">SLOTICON</slot>
		<span class="sidebar-tooltip text-gray-300 group-hover:scale-100">
			<!-- Universal, DO NOT CHANGE!! -->
			<slot name="text">SLOTTEXT</slot>
		</span>
	</div>
{:else}
	<div class="sidebar-icon group text-tertiary">
		<slot name="icon">SLOTICON</slot>
		<span class="sidebar-tooltip text-gray-300 group-hover:scale-100">
			<!-- Universal, DO NOT CHANGE!! -->
			<slot name="text">SLOTTEXT</slot>
		</span>
	</div>
{/if}
