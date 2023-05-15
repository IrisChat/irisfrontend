<script>
	import SuperChat from '$lib/SuperChat.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import { faContactCard, faList } from '@fortawesome/free-solid-svg-icons';
	import Channelbar from '$lib/ChannelBar/Channelbar.svelte';
	import ChannelTemplate from '$lib/ChannelTemplate.svelte';

	import Locator from '$lib/Locator.svelte';
	import LocatorMembers from '$lib/chat/Locator__Members.svelte';
	// Icons

	// import Fa from 'svelte-fa';

	import { faHome, faScroll, faNoteSticky } from '@fortawesome/free-solid-svg-icons';

</script>

<main>
	<SuperChat>
		<svelte:fragment slot="content"
			><ContentContainer icon={faList} title="IDQUERYFETCHRESULT.PRETTYNAME">
				<svelte:fragment slot="content">f</svelte:fragment>
			</ContentContainer></svelte:fragment
		>

		<svelte:fragment slot="channels">
			<Channelbar>
				<svelte:fragment slot="title">IDQUERYFETCHRESULT.PRETTYNAME</svelte:fragment>
				<svelte:fragment slot="channels"
					><ChannelTemplate>
						<svelte:fragment slot="dropDownContent">
							<!-- Routing Locators -->

							<Locator icon={faHome}>
								<svelte:fragment slot="header-text">Home</svelte:fragment>
							</Locator>
							<Locator icon={faScroll}>
								<svelte:fragment slot="header-text">Rules</svelte:fragment>
							</Locator>
							<Locator icon={faNoteSticky}>
								<svelte:fragment slot="header-text">Saved Notes</svelte:fragment>
							</Locator>

							<!-- Member Locators -->
							<LocatorMembers icon={faContactCard}>
								<svelte:fragment slot="header-text">Members</svelte:fragment>
							</LocatorMembers>
						</svelte:fragment></ChannelTemplate
					></svelte:fragment
				>
			</Channelbar></svelte:fragment
		>
	</SuperChat>
</main>
