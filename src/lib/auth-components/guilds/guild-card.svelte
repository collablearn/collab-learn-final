<script lang="ts">
	import sampleIcon from '$lib/assets/guild_sample_icon_320.svg';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import lockIcon from '$lib/assets/project_lock_icon_320.svg';
	import PrivateJoin from './join-guild/private-join.svelte';
	import PublicJoin from './join-guild/public-join.svelte';

	import { getAuthState } from '$lib';
	import type { CreatedGuildReference } from '$lib/types';

	export let guildObj: CreatedGuildReference;
	const authState = getAuthState();

	let showPrivateJoin = false;
	let showPublicJoin = false;
</script>

{#if guildObj.is_private}
	<PrivateJoin bind:showPrivateJoin {guildObj} />
{:else}
	<PublicJoin bind:showPublicJoin {guildObj} />
{/if}

<button
	on:click={() => (guildObj.is_private ? (showPrivateJoin = true) : (showPublicJoin = true))}
	class="bg-subwhite px-[13px] w-full py-[16px] rounded-[10px] shadow-sm shadow-black flex flex-col gap-[10px]"
>
	<p class="text-[16px] text-main text-left font-semibold">
		{guildObj.guild_name}
	</p>

	<div class="flex flex-col gap-[10px] w-full">
		<div class="mx-auto">
			<img src={sampleIcon} alt="sample-icon" />
		</div>

		<div class="text-[16px] text-main flex flex-col text-left">
			<p class="font-semibold">Host: {guildObj.host_name}</p>
			<p title={guildObj.description} class="line-clamp-2">
				{guildObj.description}
			</p>
		</div>
	</div>

	<div class="flex {guildObj.isPrivate ? 'justify-between' : 'justify-end'} items-center w-full">
		{#if guildObj.isPrivate}
			<div class="">
				<img src={lockIcon} alt="lock-icon" />
			</div>
		{/if}

		<div class="flex items-center gap-[5px]">
			<img src={groupIcon} alt="group-icon" />
			<p class="text-[14px] text-main">{guildObj.joinedCount}/{guildObj.maxUsers}</p>
		</div>
	</div>
</button>
