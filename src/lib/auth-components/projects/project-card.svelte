<script lang="ts">
	import onlineIcon from '$lib/assets/project_online_icon_320.svg';
	import offlineIcon from '$lib/assets/project_offline_icon_320.svg';
	import lockIcon from '$lib/assets/project_lock_icon_320.svg';
	import type { ProjectTypes } from '$lib/types';
	import PublicJoin from './join-project/public-join.svelte';
	import PrivateJoin from './join-project/private-join.svelte';

	export let projectObj: ProjectTypes;
</script>

<PublicJoin />

<button
	class="bg-subwhite px-[13px] py-[16px] rounded-[10px] relative shadow-sm shadow-black text-left"
>
	<div class="grid grid-cols-3 gap-[10px]">
		<!--For project image-->
		<div class="w-[100%] h-[100px] bg-white relative">
			{#if projectObj.isPrivate}
				<img src={lockIcon} alt="lock-icon" class="absolute bottom-0 right-0" />
			{/if}
		</div>

		<!--For project details-->
		<div class="  w-[100%] col-span-2">
			<h3 class="text-[16px] text-main font-semibold truncate">{projectObj.projectName}</h3>
			<p class="text-[14px] text-main line-clamp-3">
				{projectObj.projectDescription}
			</p>

			<div class="absolute right-0 bottom-0 mb-[5px] mr-[10px]">
				<div class="flex items-center gap-[5px]">
					{#if projectObj.onlineCount}
						<img src={onlineIcon} alt="online-icon" />
						<p class="text-[14px] text-main">Online {projectObj.onlineCount}</p>
					{:else}
						<img src={offlineIcon} alt="online-icon" />
						<p class="text-[14px] text-main">Offline</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</button>
