<script lang="ts">
	import { getAuthState } from '$lib';
	import JoinedProjectCard from './joined-project--card.svelte';

	const authState = getAuthState();
</script>

<div class="w-full">
	<p class="text-[16px] text-main font-semibold w-full">Recent Project(s)</p>

	<hr class="mt-[11px] mb-[24px] w-full border-[1px] border-main" />

	{#if $authState.guilds.joinedGuildArray?.length}
		<div class="grid gap-[20px] lg:grid-cols-2">
			{#each $authState.projects.joinedProjectArray ?? [] as joinedProjectObj, index}
				<JoinedProjectCard {joinedProjectObj} />
			{/each}
		</div>
	{:else}
		<div class="text-main min-h-[140px] flex justify-center items-center">
			<p class="text-[14px]">You have no recent project yet.</p>
		</div>
	{/if}
</div>
