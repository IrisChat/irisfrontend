<script>
	import ChannelTemplate from '$lib/ChannelTemplate.svelte';
	import Fa from 'svelte-fa';
	import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="channel-bar shadow-lg h-screen flex-wrap">
	<!-- ChannelBlock -->
	<div class="channel-block">
		<h5 class="channel-block-text dark:text-white font-medium"><slot name="title">slot=title</slot></h5>
	</div>
	<slot name="channels"
		><ChannelTemplate>
			<svelte:fragment slot="dropDownContent">
				<Fa icon={faChevronDown} size="14" />
				<h5 class="dropdown-header-text-selected">Topic</h5>

				<Fa icon={faPlus} size="12" class="text-accent text-opacity-80 my-auto ml-auto" />
			</svelte:fragment>
		</ChannelTemplate></slot
	>
</div>
