<script lang="ts">
	import CreateGuildBtn from '$lib/auth-components/guilds/create-guild-btn.svelte';
	import GuildCard from '$lib/auth-components/guilds/guild-card.svelte';
	import SearchGuilds from '$lib/auth-components/guilds/search-guilds.svelte';
	import GuildJoinedContent from '$lib/auth-components/guilds/join-guild/guild-joined-content.svelte';
	import { getAuthState, getUserState } from '$lib';
	import { fade, scale } from 'svelte/transition';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	const authState = getAuthState();

	$authState.activeItem = '/guilds';
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
						<SearchGuilds />
					</div>

					<div class="grid gap-[20px] lg:grid-cols-2">
						{#each $authState.guilds.createdGuilds ?? [] as guildObj}
							<GuildCard {guildObj} />
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
