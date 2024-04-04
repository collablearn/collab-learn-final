<script lang="ts">
	import sampleIcon from '$lib/assets/description_icon_320_sample.svg';
	import type { GuildChatReference } from '$lib/types';

	export let chatObj: GuildChatReference;
</script>

<div class=" ">
	<div class="flex items-center gap-[10px]">
		<div class="">
			<img
				src={chatObj.user_photo_link ?? sampleIcon}
				alt="sample-icon"
				class="w-[25px] h-[25px] rounded-full"
			/>
		</div>

		<div class="flex flex-col">
			<p class="text-main text-[14px] font-semibold">{chatObj.user_fullname}</p>
		</div>
	</div>

	<div class="p-[10px]">
		<p class="text-main text-[14px]">
			{chatObj.guild_chat}
		</p>
	</div>
</div>
