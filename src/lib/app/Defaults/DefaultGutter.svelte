<script lang="ts">
	import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
	import IconPlus from "@tabler/icons-svelte/dist/svelte/icons/IconPlus.svelte";
	import IconSettings from "@tabler/icons-svelte/dist/svelte/icons/IconSettings.svelte";
	import Fa from "svelte-fa";

</script>
<div class="icon-container mx-4 flex flex-col items-center text-center text-NORD5">
    <div class="customize-profile my-2 cursor-pointer rounded-md p-2 hover:bg-NORD2">
        <IconSettings stroke={1.25} />
    </div>
    <div
        class="add-server my-2 cursor-pointer rounded-md border border-dotted border-NORD5 p-1 hover:bg-NORD2"
    >
        <IconPlus stroke={2} />
    </div>
    <div class="customize-profile my-2 cursor-pointer rounded-md p-2 hover:bg-NORD2">
        <Fa icon={faPaintBrush} size="20" />
    </div>
</div>