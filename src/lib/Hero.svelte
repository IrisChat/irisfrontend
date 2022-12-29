<div
	class="hero flex h-screen w-full flex-wrap items-center justify-center text-center text-8xl font-semibold text-white"
>
	<div class="z-10 flex w-full flex-wrap items-center justify-center text-center">
		<div class="flex w-full flex-wrap items-center justify-center rounded-sm lg:pb-12">
			<div class="basis-full py-8 text-center text-5xl font-bold capitalize lg:py-0 lg:text-8xl">
				<slot name="heading">IRC App</slot>
			</div>
			<div class="flex flex-wrap items-center justify-center text-center text-base font-light">
				<slot name="caption">
					<a href="/auth">
						<button
							class="text-md hover:opacity-98 mx-10 my-10 rounded border border-blue-500 px-10 py-5 font-bold text-blue-500 hover:bg-gray-200"
							>Login</button
						></a
					></slot
				>
			</div>
		</div>
	</div>
</div>

<style>
	.hero {
		background: #0c0c0c;
		background-attachment: fixed;
		background-position: center;
		background-size: cover;
		border: 1px solid rgb(59, 130, 246);
		/* border-radius: 1vw; */
	}
</style>
