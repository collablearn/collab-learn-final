<script lang="ts">
	import CreateGuildBtn from '$lib/auth-components/guilds/create-guild-btn.svelte';
	import GuildCard from '$lib/auth-components/guilds/guild-card.svelte';
	import SearchGuilds from '$lib/auth-components/guilds/search-guilds.svelte';
	import { getActiveItem } from '$lib';

	let activeItem = getActiveItem();

	$activeItem = '/guilds';
</script>

<div class="fixed bottom-0 right-0 m-[20px] z-10">
	<CreateGuildBtn />
</div>

<div class="">
	<div class="">
		<SearchGuilds />
	</div>

	<div class="flex flex-col gap-[20px] mt-[35px]">
		{#each Array(10) as sample}
			<GuildCard />
		{/each}

		<div class="">
			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				1
			</button>

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				2
			</button>

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				3
			</button>

			...

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				10
			</button>
		</div>
	</div>
</div>
