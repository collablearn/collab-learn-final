<script lang="ts">
	import sampleIcon from '$lib/assets/guild_sample_icon_320.svg';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import PrivateJoin from './join-guild/private-join.svelte';
	import PublicJoin from './join-guild/public-join.svelte';

	import { getAuthState } from '$lib';
	import type { GuildTypes } from '$lib/types';

	export let guildObj: GuildTypes;
	const authState = getAuthState();
</script>

<PrivateJoin />

<button class="bg-subwhite px-[13px] py-[16px] rounded-[10px] relative shadow-sm shadow-black">
	<div class="grid grid-cols-3 gap-[10px]">
		<div class="">
			<img src={sampleIcon} alt="sample-icon" />
		</div>

		<div class="text-right col-span-2">
			<p class="text-[16px] text-main truncate">{guildObj.guildName}</p>
			<p class="text-[14px] text-main truncate">{guildObj.hostName}</p>
		</div>
	</div>

	<div class="absolute right-0 top-0 mr-[10px] mt-[74px]">
		<div class="flex items-center gap-[5px]">
			<img src={groupIcon} alt="group-icon" />
			<p class="text-[14px] text-main">7/15</p>
		</div>
	</div>
</button>
