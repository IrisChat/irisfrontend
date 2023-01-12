<script lang="ts">
	export let floatLeft = false;
	export let icon: string;
</script>

{#if floatLeft}
	<div class="user-message flex flex-wrap items-center justify-start">
		<div class="icon-wrap">
			<img src={icon} class="w-10 rounded-full" alt="Avatar" />
		</div>
		<div class="whitespace-pre-wrap break-words">
			<div
				class="umsg-content mx-2 my-2 max-w-md rounded bg-option bg-opacity-60 px-4 py-2 font-medium text-primary"
			>
				<div class="flex flex-1">
					<div class="grid text-left">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="user-message flex flex-wrap items-center justify-end">
		<div class="whitespace-pre-wrap break-words">
			<div
				class="umsg-content mx-2 my-2 max-w-md rounded bg-tertiary bg-opacity-60 px-4 py-2 font-medium text-primary"
			>
				<div class="flex flex-1">
					<div class="grid text-left">
						<slot />
					</div>
				</div>
			</div>
		</div>
		<div class="icon-wrap">
			<img src={icon} class="w-10 rounded-full" alt="Avatar" />
		</div>
	</div>
{/if}
