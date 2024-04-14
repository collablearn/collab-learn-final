<script lang="ts">
	import type { JoinedGuildReference, JoinedProjectReference } from '$lib/types';
	import sampleIcon from '$lib/assets/guild_sample_icon_320.svg';

	export let joinedProjectObj: JoinedProjectReference;
</script>

<div
	class="bg-subwhite border-[1px] border-main h-full w-full p-[20px] rounded-[10px] relative shadow-sm shadow-black text-left flex flex-col gap-[10px] break-words"
>
	<div class="flex flex-col sm:flex-row gap-[20px]">
		<!--For guild image-->
		<div class="">
			<img
				src={joinedProjectObj.project_image_url ?? sampleIcon}
				alt="sample-icon"
				class="rounded-[10px]"
			/>
		</div>

		<div class="flex flex-col gap-[10px] w-full">
			<div class="">
				<h3 class="text-[16px] text-main font-semibold line-clamp-1">
					{joinedProjectObj.project_name}
				</h3>
			</div>
			<div class="">
				<p class="text-[14px] font-semibold text-main">Host:</p>
				<p class="text-[14px] text-main">{joinedProjectObj.host_name}</p>
			</div>
		</div>
	</div>
</div>
