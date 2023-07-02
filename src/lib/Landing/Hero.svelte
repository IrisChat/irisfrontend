<script lang="ts">
	import Navigation from '$lib/Global/Navigator.svelte';
</script>

<section style="color: #E8E8E8">
	<div class="hero w-full pb-20 text-center">
		<div class="content mx-16 flex flex-wrap items-center justify-center">
			<Navigation />
			<div class="section-zero flex w-full flex-wrap items-center justify-center text-left text-white">
				<div class="headline flex-1 items-center justify-center">
					<div class="headline-container mx-8 inline-block">
						<div class="break-words text-5xl font-light" style="width: 557px">
							It's time to ditch Discord. Iris is here.
						</div>
						<div class="text-md break-words opacity-75 py-4" style="width: 514px">
							Iris is an open-source Discord alternative. It's a new, fast and secure way of
							connecting.
						</div>
						<div class="call-to-action-buttons flex cursor-pointer items-center py-4">
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
					<img src="/images/laptop.png" alt="Best Laptops 2023" width="410px" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		background-color: #789cbc; /* Fallback color */
		background-image: url('/images/Hero.jpg');
		background-position: center;
		/* background-size: contain; */
		/* background-repeat: no-repeat; */
		/* border-radius: 1vw; */
	}
</style>
