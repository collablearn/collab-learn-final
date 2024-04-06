<script lang="ts">
	import onlineIcon from '$lib/assets/project_online_icon_320.svg';
	import offlineIcon from '$lib/assets/project_offline_icon_320.svg';
	import lockIcon from '$lib/assets/project_lock_icon_320.svg';
	import type { CreatedProjectReference } from '$lib/types';
	import PublicJoin from './join-project/public-join.svelte';
	import PrivateJoin from './join-project/private-join.svelte';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';

	export let projectObj: CreatedProjectReference;

	let showPrivateJoin = false;
	let showPublicJoin = false;

	const handleJoin = () => {
		if (projectObj.is_private) {
			showPrivateJoin = true;
			showPublicJoin = false;
		} else {
			showPrivateJoin = false;
			showPublicJoin = true;
		}
	};
</script>

<PrivateJoin bind:showPrivateJoin {projectObj} />
<PublicJoin bind:showPublicJoin {projectObj} />

<button
	class="bg-subwhite px-[13px] py-[16px] rounded-[10px] relative shadow-sm shadow-black text-left flex flex-col gap-[10px]"
	on:click={handleJoin}
>
	<h3 class="text-[16px] text-main font-semibold truncate">{projectObj.project_name}</h3>
	<div class="flex gap-[10px] w-full">
		<!--For project image-->
		<div class="w-[200px] h-[100px] bg-white relative">
			{#if projectObj.is_private}
				<img src={lockIcon} alt="lock-icon" class="absolute bottom-0 right-0" />
			{/if}
		</div>

		<!--For project details-->
		<div class="w-[100%]" title={projectObj.description}>
			<p class="text-[14px] text-main line-clamp-3 sm:line-clamp-none text-wrap">
				{projectObj.description}
			</p>

			<div class="absolute right-0 bottom-0 mb-[5px] mr-[10px]">
				<div class="flex items-center gap-[5px]">
					<img src={groupIcon} alt="group-icon" />
					<p class="text-[14px] text-main">{projectObj.joined_count}/{projectObj.max_users}</p>
				</div>
			</div>
		</div>
	</div>
</button>
