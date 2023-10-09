<script lang="ts">
	export let icon: string = '/pixel.png';
	export let username: string = '';
	export let preview: string = '';
	export let status: string = 'offline';
	export let notification: Boolean = true;
	export let size: number = 40;
        export let space: number = 52;
</script>

<!---
			            @params 'icon' User Icon
					            'username' Username of who contacted you
					            'preview' Last message preview
					            'status' User status
					    @slotParams 'notification' Last message timestamp/amount of unread message count
					-->

<div
	class="conversation my-2 flex w-full cursor-pointer select-none items-center rounded-md py-4 px-2 hover:bg-NORD4"
>
	<div class="icon-wrap flex items-center text-left" style={'width:' + space + 'px;'}>
		<div class="icon_wrap relative mr-4 rounded-full">
			<!-- CSS hack lol-->
			<img
				class="rounded-full"
				style={'height:' + size + 'px; width:' + size + 'px;'}
				src={icon}
				alt={username}
			/>
			{#if status == 'online'}
				<span
					class="border-primary absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-green-400"
				>
					&nbsp;
				</span>
			{:else if status == 'offline'}
				<span
					class="border-primary absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-yellow-400"
				>
					&nbsp;
				</span>
			{:else if status == 'DnD'}
				<span
					class="border-primary absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-red-400"
				>
					&nbsp;
				</span>
			{:else}
				<span
					class="border-primary absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-gray-400"
				>
					&nbsp;
				</span>
			{/if}
		</div>
	</div>
	<div class="details-block block flex-1 text-left text-base font-medium leading-4 text-NORD8">
		{username}
		<div class="w-56 truncate text-xs font-normal text-NORD8">
			{preview}
		</div>
	</div>
	{#if notification}
		<div class="message-notification mb-4 block h-full text-sm text-NORD7">
			<slot name="notification">slot=notification</slot>
		</div>
	{/if}
</div>
