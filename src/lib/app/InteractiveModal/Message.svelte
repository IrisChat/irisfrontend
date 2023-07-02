<script lang="ts">
	export let icon: string = '/pixel.png';
	export let username: string = '';
	export let content: string = '';
</script>

<!---
			            @params 'icon' User Icon
					            'username' Username of who contacted you
					            'content' The content of the message [NOTE: Could either be passed in as an ARGUMENT or SLOT]
					            'status' User status
					    @slotParams 'notification' Last message timestamp/amount of unread message count
					-->
<div
	class="conversation my-2 flex w-full mx-4 cursor-pointer select-none rounded-md py-4 px-2 hover:bg-NORD4"
>
	<div class="icon-wrap text-left">
		<img
			class="rounded-full border border-NORD4"
			style="height: 40px; width: 40px"
			src={icon}
			alt={username}
		/>
	</div>
	<div
		class="details-block mx-4 block flex-1 text-left text-base font-medium leading-relaxed text-NORD8"
	>
		<div class="usernameTimestampCombo flex">
			<div class="hover:underline">{username}</div>
			<div class="message-notification mx-2 mb-4 block h-full text-xs font-normal text-NORD4">
				<slot name="notification">slot=notification</slot>
			</div>
		</div>
		<div class="max-w-48 break-all text-xs font-normal text-NORD8">
			<!--- We don't truncate these texts, but we break everything in sight -->
			{#if content}
				{content}
			{:else}
				<slot name="content" />
			{/if}
		</div>
	</div>
</div>
