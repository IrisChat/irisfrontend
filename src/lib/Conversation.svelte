<div
	class="conversation w-full flex items-center justify-center rounded-md hover:bg-gray-200 hover:bg-opacity-30 hover:backdrop-blur-sm cursor-pointer"
>
	<div class="pl-2 pr-5">
		<slot name="icon">slot=icon</slot>
	</div>
	<h5 class="dropdown-header-text"><slot name="header-text">slot=header-text</slot></h5>
	<div class="whitespace my-auto ml-auto" />
</div>
