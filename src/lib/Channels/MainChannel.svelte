<script>
	import Locator from '$lib/Locator.svelte';
	import LocatorConversation from '$lib/Locator__Conversation.svelte';
	import ChannelTemplate from '$lib/ChannelTemplate.svelte';
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

        <Locator icon={faHome}>
            <svelte:fragment slot="header-text">Home</svelte:fragment>
        </Locator>
        <Locator icon={faAddressCard}>
            <svelte:fragment slot="header-text">Friends</svelte:fragment>
        </Locator>
        <Locator icon={faBoltLightning}>
            <svelte:fragment slot="header-text">Donate</svelte:fragment>
        </Locator>
        <Locator icon={faNoteSticky}>
            <svelte:fragment slot="header-text">Saved Notes</svelte:fragment>
        </Locator>

        <!-- Conversation Locators -->
        <LocatorConversation icon={faPlus}>
            <svelte:fragment slot="header-text">Conversations</svelte:fragment>
        </LocatorConversation>
    </svelte:fragment></ChannelTemplate
>