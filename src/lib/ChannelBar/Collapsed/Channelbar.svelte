<script>
	import ChannelTemplate from '$lib/ChannelBar/Collapsed/ChannelTemplate.svelte';
	import Fa from 'svelte-fa';
	import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="channel-bar hidden h-full w-fit flex-wrap md:block">
	<!-- ChannelBlock -->
	<div class="channel-block shadow-lg backdrop-opacity-60">
		<div class="flex w-fit items-center justify-center font-semibold dark:text-text">
			<slot name="title">slot=title</slot>
		</div>
	</div>
	<slot name="channels"
		><ChannelTemplate>
			<svelte:fragment slot="dropDownContent">
				<Fa icon={faChevronDown} size="14" />
				<h5 class="dropdown-header-text-selected">Topic</h5>

				<Fa icon={faPlus} size="12" class="text-accent my-auto ml-auto text-opacity-80" />
			</svelte:fragment>
		</ChannelTemplate></slot
	>
</div>
