<script>
	import Hero from '$lib/Hero.svelte';
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import GitHubCorner from '$lib/GitHubCorner.svelte';
	// import Splash from '$lib/Splash.svelte';
</script>

<!-- <Splash /> -->

<GitHubCorner/>
<main class="bg-white">
	<Hero />
	<section class="section-one mx-16 flex flex-wrap items-center justify-center py-52 text-left">
		<div class="headline flex-1 items-center justify-center">
			<div class="headline-container mx-8 inline-block">
				<div class="break-words text-5xl font-light" style="width: 557px; color: #2EC0F9">
					A** UI, Pog To-Do List
				</div>
				<div class="text-md break-words py-4 opacity-70" style="width: 514px">
					Paragraph of text beneath the heading to explain the heading. We'll add onto it with
					another sentence and probably just keep going until we run out of words.
				</div>
				<div class="call-to-action-buttons flex cursor-pointer items-center py-4 text-white">
					<a href="/download?dist=latest">
						<div
							class="download-button rounded-md border border-white px-4 py-2 text-base font-semibold hover:opacity-90"
							style="background: #B95F89"
						>
							Download
						</div>
					</a>
					<a href="/app">
						<div
							class="open-app mx-4 cursor-pointer rounded-md border border-white px-4 py-2 text-base font-semibold hover:opacity-90"
							style="background: #2EC0F9"
						>
							Open App
						</div>
					</a>
				</div>
			</div>
		</div>
		<div class="laptop flex flex-1 items-center justify-center text-center">
			<img
				src="https://user-images.githubusercontent.com/34188635/219129242-2d64aec6-641f-4f4f-af12-b4b8323e5624.png"
				alt="Our bad UI isn't here to stay!"
				width="410px"
			/>
		</div>
	</section>
	<footer class="flex flex-wrap items-center py-8 px-16" style="color: #E8E8E8">
		<div class="footer-logo flex-1">
			<div class="logo-container mx-4 flex items-center">
				<div class="logo flex justify-start text-4xl font-semibold">IRIS</div>
				<div class="logo font-base mx-4 flex justify-start text-sm opacity-75">
					Fast, secure and minimal.
				</div>
			</div>
			<div class="logo mx-4 flex justify-start py-2 pb-2 text-sm font-light">
				SkiesUwU and AlexDev404 ©️ {new Date().getFullYear()} All Rights Reserved
			</div>
		</div>
		<div class="github-reference justify-end">
			<a href="https://github.com/IrisChat" rel="noreferrer" target="__blank">
				<div
					class="github-reference-rectangle flex items-center justify-center rounded-xl px-3 py-3 hover:opacity-90"
					style="background: #972158"
				>
					<Fa icon={faGithub} size="32" />
				</div></a
			>
		</div>
	</footer>
</main>

<style>
	footer {
		background-color: #789cbc; /* Fallback color */
		background-image: url('/images/Hero.jpg');
		background-position: center;
		/* background-size: contain; */
		/* background-repeat: no-repeat; */
		/* border-radius: 1vw; */
	}
</style>
