<script lang="ts">
	import sampleIcon from '$lib/assets/guild_sample_icon_320.svg';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import lockIcon from '$lib/assets/project_lock_icon_320.svg';
	import PrivateJoin from './join-guild/private-join.svelte';
	import PublicJoin from './join-guild/public-join.svelte';

	import { getAuthState } from '$lib';
	import type { GuildTypes } from '$lib/types';

	export let guildObj: GuildTypes;
	const authState = getAuthState();

	let showPrivateJoin = false;
</script>

<PrivateJoin bind:showPrivateJoin {guildObj} />

<button
	on:click={() => (showPrivateJoin = true)}
	class="bg-subwhite px-[13px] w-full py-[16px] rounded-[10px] shadow-sm shadow-black flex flex-col gap-[10px]"
>
	<p class="text-[16px] text-main text-left font-semibold">
		{guildObj.guildName}
	</p>

	<div class="flex flex-col gap-[10px] w-full">
		<div class="mx-auto">
			<img src={sampleIcon} alt="sample-icon" />
		</div>

		<div class="text-[16px] text-main flex flex-col text-left">
			<p class="font-semibold">Host: {guildObj.hostName}</p>
			<p title={guildObj.guildDescription} class="line-clamp-2">
				{guildObj.guildDescription}
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
			<p class="text-[14px] text-main">7/15</p>
		</div>
	</div>
</button>
