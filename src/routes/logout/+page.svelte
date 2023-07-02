Are you sure you want to logout?

<div class="logout">
	<button
		class="rounded bg-red-800 px-4 py-2 font-semibold text-white hover:opacity-80"
		on:click={() => {
			localStorage.clear();
			window.location.reload();
			window.location.href = '/';
		}}
	>
		Logout</button
	>
</div>
