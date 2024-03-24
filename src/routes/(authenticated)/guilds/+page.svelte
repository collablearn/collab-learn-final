<script lang="ts">
	import CreateGuildBtn from '$lib/auth-components/guilds/create-guild-btn.svelte';
	import GuildCard from '$lib/auth-components/guilds/guild-card.svelte';
	import SearchGuilds from '$lib/auth-components/guilds/search-guilds.svelte';
	import { array } from 'zod';
</script>

<div class="fixed bottom-0 right-0 m-[20px] z-10">
	<CreateGuildBtn />
</div>

<div class="">
	<div class="">
		<SearchGuilds />
	</div>

	<div class="flex flex-col gap-[20px] mt-[35px]">
		{#each Array(30) as sample}
			<GuildCard />
		{/each}
	</div>
</div>
