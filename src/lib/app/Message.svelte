<script lang="ts">
	export let icon: string = '/pixel.png';
	export let username: string = '';
	export let preview: string = '';
	export let status: string = 'offline';
	export let notification: Boolean = true;
</script>

<!---
			            @params 'icon' User Icon
					            'username' Username of who contacted you
					            'preview' Last message preview
					            'status' User status
					    @slotParams 'notification' Last message timestamp/amount of unread message count
					-->

<div class="conversation flex w-full cursor-pointer items-center rounded-md py-4 my-2 px-2 hover:bg-NORD4 select-none">
	<div class="icon-wrap flex items-center text-left">
		<div class="icon_wrap relative mr-4 rounded-full">
			<img class="rounded-full" width="40px" height="40px" src={icon} alt={username}/>
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
		<div class="text-xs font-normal text-NORD8 truncate w-56">
			{preview}
		</div>
	</div>
	{#if notification}
	<div class="message-notification mb-4 block h-full text-sm text-NORD7">
		<slot name="notification">slot=notification</slot>
	</div>
	{/if}
</div>
