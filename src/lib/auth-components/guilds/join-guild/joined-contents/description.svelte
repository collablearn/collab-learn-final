<script lang="ts">
	import DescriptionCard from './description-card.svelte';
	import createIcon from '$lib/assets/create_guild_icon_320.svg';

	const selections = ["Guild's Wall", 'Chat Feed'];
</script>

<div class="fixed bottom-0 right-0 mr-[33px] mb-[33px] z-20">
	<button class="transition-all active:scale-105">
		<img src={createIcon} alt="add-description-icon" />
	</button>
</div>

<div class="mt-[40px]">
	<div class="flex items-center gap-[10px]">
		{#each selections as selection}
			<button class="text-main text-[14px]">{selection}</button>
		{/each}
	</div>

	<div class="mt-[20px] flex flex-col gap-[15px]">
		{#each Array(15) as sample}
			<DescriptionCard />
		{/each}
	</div>
</div>
