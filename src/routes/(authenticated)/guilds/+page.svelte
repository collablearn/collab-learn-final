<script lang="ts">
	import CreateGuildBtn from '$lib/auth-components/guilds/create-guild-btn.svelte';
	import GuildCard from '$lib/auth-components/guilds/guild-card.svelte';
	import SearchGuilds from '$lib/auth-components/guilds/search-guilds.svelte';
	import GuildJoinedContent from '$lib/auth-components/guilds/join-guild/guild-joined-content.svelte';
	import { createSearchStore, getAuthState, getUserState, searchHandler } from '$lib';
	import { fade, scale } from 'svelte/transition';
	import type { LayoutData } from '../$types';
	import { onDestroy, tick } from 'svelte';
	import { flip } from 'svelte/animate';

	export let data: LayoutData;

	const authState = getAuthState();

	$authState.activeItem = '/guilds';

	const generateClientCopy = () => {
		const generatedGuilds = $authState.guilds.createdGuilds?.map((guild) => ({
			...guild,
			searchTerms: `${guild.description} ${guild.host_name} ${guild.guild_name} `
		}));

		return generatedGuilds;
	};

	let searchStore = createSearchStore(generateClientCopy() ?? []);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => unsubscribe());
</script>

<div class="min-h-screen w-full relative" in:fade>
	<div class="">
		{#if $authState.guilds.joinedGuild}
			<GuildJoinedContent supabase={data.supabase} />
		{:else}
			<div class="">
				<div class="fixed bottom-0 right-0 m-[20px] z-10">
					<CreateGuildBtn />
				</div>

				<div class="px-[22px]">
					<div class="py-[50px]">
						<SearchGuilds bind:searchTerm={$searchStore.search} />
					</div>

					<div class="grid gap-[20px] lg:grid-cols-2">
						{#each $searchStore.filtered as guildObj (guildObj.id)}
							<div class="" animate:flip={{ duration: 320 }} transition:fade>
								<GuildCard {guildObj} />
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
