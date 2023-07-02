<script lang="ts">
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
</script>

<div class="w-full">
	<div class="navbar relative my-16 flex items-center justify-center rounded-2xl py-4">
		<a href="/"
			><div
				class="logo mx-8 flex justify-start text-4xl font-semibold hover:underline hover:opacity-95"
				style="flex: 1"
			>
				IRIS
			</div></a
		>
		<div class="flex justify-end" style="flex: 1.1">
			<div class="navigation-elements mx-4 flex w-full items-center justify-end">
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
			</div>
		</div>
	</div>
</div>

<style>
	.navbar {
		background: #9bbdf917;
	}
	.navigation-elements {
		color: #eef4fe;
	}
</style>
