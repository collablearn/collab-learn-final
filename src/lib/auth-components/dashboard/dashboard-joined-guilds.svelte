<script lang="ts">
	import arrowRightIcon from '$lib/assets/arrow-right_icon.svg';
	import { getAuthState } from '$lib';

	const authState = getAuthState();
</script>

<div class="">
	<p class="text-[16px] text-main font-semibold w-full">Joined Guild(s)</p>

	<hr class="mt-[11px] mb-[24px] w-full border-[1px] border-main" />

	{#if $authState.guilds.joinedGuildArray?.length}
		<div class="container overflow-x-scroll flex space-x-4">
			{#each $authState.guilds.joinedGuildArray ?? [] as joinGuildObj, index}
				<div class="flex-shrink-0 w-full h-40 bg-subwhite rounded-lg p-[20px]">
					<div class="w-full text-[14px] flex flex-col gap-[10px]">
						<p class="text-[16px]">Guild Name:</p>
						<p>{joinGuildObj.guild_name}</p>
						<p class="text-[16px]">Host Name:</p>
						<p>{joinGuildObj.host_name}</p>
					</div>
				</div>
			{/each}
		</div>

		{#if $authState.guilds.joinedGuildArray.length > 1}
			<button class="flex items-center gap-[10px] text-[14px] text-main font-semibold mt-[10px]"
				>Swipe for more
				<img src={arrowRightIcon} class="" alt="arrow-right-icon" />
			</button>
		{/if}
	{:else}
		<div class="text-main min-h-[140px] flex justify-center items-center">
			<p class="text-[14px]">You have no guild yet.</p>
		</div>
	{/if}
</div>

<style>
	/* width */
	::-webkit-scrollbar {
		width: 10px;
		height: 5px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #800000;
		border-radius: 5px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #800000;
	}
</style>
