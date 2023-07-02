<script lang="ts">
	import IconHome from '@tabler/icons-svelte/dist/svelte/icons/IconHome.svelte';

	export let avatar: string = '/pixel.png';
</script>

<!--
		@slotParams 'serverLeft' and 'serverRight' Used for the left and right gutters for servers
		@params 'avatar' User avatar
		-->

<div class="node-container flex h-full w-full items-center justify-center bg-NORD2 text-center">
	<div
		class="user-profile-image mx-2 cursor-pointer rounded-full border border-NORD4 hover:opacity-90"
	>
		<img class="w-9" src={avatar} alt="Profile Avatar ID" />
	</div>
	<div class="guild-selection h-full w-full">
		<div
			class="guild_carousel flex h-full w-full items-center justify-center text-center text-NORD8"
		>
			<div class="serverLeft flex justify-around">
				<slot name="serverLeft">
					<div
						class="guild-ID-image mx-2 cursor-pointer rounded-md border-2 border-red-800 hover:opacity-90"
					>
						<img class="w-9" src={avatar || '/pixel.png'} alt="Profile Avatar ID" />
					</div></slot
				>
			</div>
			<div
				class="meta-home-button mx-4 cursor-pointer rounded-md  border border-NORD8 p-1 hover:opacity-90"
				on:keydown={() => (window.location.href = '/app')}
				on:click={() => (window.location.href = '/app')}
			>
				<IconHome stroke={1.25} size={24} />
			</div>
			<div class="serverRight flex justify-around">
				<slot name="serverRight">
					<div
						class="guild-ID-image mx-2 cursor-pointer rounded-md border-2 border-red-800 hover:opacity-90"
					>
						<img class="w-9" src={avatar || '/pixel.png'} alt="Profile Avatar ID" />
					</div></slot
				>
			</div>
		</div>
	</div>
</div>
