<script>
	import Locator from '$lib/ChannelBar/Collapsed/LocatorMin.svelte';
	import LocatorConversation from '$lib/ChannelBar/Collapsed/Locator__Conversation.svelte';
	import ChannelTemplate from '$lib/ChannelBar/Collapsed/ChannelTemplate.svelte';
	// Icons

	// import Fa from 'svelte-fa';

	import {
		faHome,
		faAddressCard,
		faNoteSticky,
		faPlus,
		faBoltLightning
	} from '@fortawesome/free-solid-svg-icons';
</script>

<ChannelTemplate>
	<svelte:fragment slot="dropDownContent">
		<!-- Routing Locators -->

		<Locator icon={faHome} />
		<Locator icon={faAddressCard} />
		<Locator icon={faBoltLightning} />
		<Locator icon={faNoteSticky} />

		<!-- Conversation Locators -->
		<LocatorConversation icon={faPlus} />
	</svelte:fragment></ChannelTemplate
>
