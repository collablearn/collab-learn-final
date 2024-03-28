<script lang="ts">
	import DescriptionCard from './description-card.svelte';
	import createIcon from '$lib/assets/create_guild_icon_320.svg';
	import ChatCard from './chat-card.svelte';

	const selections = ["Guild's Wall", 'Chat Feed'];
	let activeItem = "Guild's Wall";
</script>

{#if activeItem === "Guild's Wall"}
	<div class="fixed bottom-0 right-0 mr-[33px] mb-[33px] z-20">
		<button class="transition-all active:scale-105">
			<img src={createIcon} alt="add-description-icon" />
		</button>
	</div>
{/if}

<div class="mt-[40px]">
	<div class="flex items-center gap-[10px]">
		{#each selections as selection}
			<button
				on:click={() => (activeItem = selection)}
				class="text-main text-[14px] transition-all {activeItem === selection
					? 'font-bold underline'
					: ''}"
				>{selection}
			</button>
		{/each}
	</div>

	{#if activeItem === "Guild's Wall"}
		<div class="mt-[20px] flex flex-col gap-[15px]">
			{#each Array(15) as sample}
				<DescriptionCard />
			{/each}
		</div>
	{:else}
		<div class="mt-[20px] flex flex-col gap-[15px]">
			{#each Array(15) as sample}
				<ChatCard />
			{/each}
		</div>
	{/if}
</div>
