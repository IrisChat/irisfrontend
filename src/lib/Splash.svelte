<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCloud } from '@fortawesome/free-solid-svg-icons';
	// There are six loading messages each with their own "thing"

	function getQuote() {
		// XHR is synchronous
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.quotable.io/random', false);
		xhr.send();
		if (xhr.readyState === 4 && xhr.status === 200) {
			const json = JSON.parse(xhr.responseText);
			return json.content;
		} else {
			throw new Error('Error fetching quote');
		}
	} // 'The world cares very little about what a man or woman knows; it is what a man or woman is able to do that counts.'
	async function selectLoadingMessage(){const LoadingMessages = [
		await getQuote(),
		'Ping-Ponging Your Mum',
		'Loading In',
		await getQuote(),
		'There is a magnet in your heart that will attract true friends. That magnet is unselfishness, thinking of others first; when you learn to live for others, they will live for you.',
		'Hello there!',
		await getQuote(),
		'Preparing the Application'
	];
	const Random: number = Math.floor(Math.random() * LoadingMessages.length); return LoadingMessages[Random];}
</script>

<main
	class="flex h-screen w-full select-none flex-col items-center justify-end overflow-hidden text-center"
	style="color: #2EC0F9"
>
	<div class="notification flex flex-1 flex-col items-center justify-end">
		<div class="notification-content inline-block">
			<div class="logo text-5xl font-semibold">IRIS</div>
			<div class="message my-4 text-sm font-extralight">{#await selectLoadingMessage()}{:then selection}{selection}{/await}</div>
		</div>
	</div>
	<div
		class="troubleshooting-tips flex w-full flex-col items-center justify-end py-12 text-center text-sm font-extralight first-letter:h-full"
		style="flex: 0.75"
	>
		<div class="troubleshooting-tips-container inline-block">
			<div class="troubleshooting-tips-callout">Network issues? Try some of these:</div>
			<a href="/status" target="__blank">
				<div
					class="server-status-link mt-4 flex cursor-pointer items-center justify-center font-semibold hover:underline hover:opacity-90"
				>
					<Fa icon={faCloud} size="20" class="mx-2 mb-1" />Server Status
				</div></a
			>
		</div>
	</div>
</main>

<style>
	main {
		/* Local style */
		background: #191b1f;
	}
</style>
