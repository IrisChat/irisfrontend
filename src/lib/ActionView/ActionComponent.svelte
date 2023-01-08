<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div
	class="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black bg-opacity-70 text-center"
>
	<span class="creator m-0 w-fit rounded bg-primary bg-opacity-100 px-4 py-4 text-text opacity-100">
		<div class="creator_wrapper py-4">
			<div class="creator_meta pb-4">
				<div class="creator_title text-xl font-semibold">{title}</div>
				<div class="creator_description text-sm font-light">
					{description}
				</div>
			</div>
			<form
				on:submit={(event) => {
					event.preventDefault();
				}}
				action="#"
			>
				<slot />
			</form>
		</div>
	</span>
</div>
