<script lang="ts">
	import { getAuthState } from '$lib';

	const authState = getAuthState();
</script>

<div class="">
	<p class="text-[16px] text-main font-semibold w-full">Joined Guild(s)</p>

	<hr class="mt-[11px] mb-[24px] w-full border-[1px] border-main" />

	<div class="overflow-x-scroll flex space-x-4">
		{#each $authState.guilds.joinedGuildArray ?? [] as joinGuildObj, index}
			<div
				class="flex-shrink-0 w-full h-40 bg-subwhite rounded-lg flex items-center justify-center"
			>
				<p>{joinGuildObj.guild_name}</p>
			</div>
		{/each}
	</div>

	<div class="text-main min-h-[140px] flex justify-center items-center">
		<p class="text-[14px]">You have no guild yet.</p>
	</div>
</div>
