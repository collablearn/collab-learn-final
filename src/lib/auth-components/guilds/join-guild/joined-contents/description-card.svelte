<script lang="ts">
	import sampleIcon from '$lib/assets/description_icon_320_sample.svg';
	import type { GuildWallReference } from '$lib/types';

	export let guildNoteObj: GuildWallReference;
</script>

<div class="bg-subwhite flex p-[10px] gap-[10px]">
	<div class="">
		<img
			src={guildNoteObj.user_photo_link ? guildNoteObj.user_photo_link : sampleIcon}
			alt="sample-icon"
			class="w-[25px] h-[25px] rounded-full"
		/>
	</div>

	<div class="flex flex-col w-full">
		<p class="text-main text-[14px] font-semibold">{guildNoteObj.user_fullname}</p>
		<hr class="w-full border-[1px] border-submain my-[5px]" />
		<p class="text-main text-[14px]">
			{guildNoteObj.guild_note}
		</p>
	</div>
</div>
