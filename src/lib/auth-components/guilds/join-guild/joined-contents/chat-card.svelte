<script lang="ts">
	import { getUserState } from '$lib';
	import sampleIcon from '$lib/assets/description_icon_320_sample.svg';
	import type { GuildChatReference } from '$lib/types';

	export let chatObj: GuildChatReference;

	const userState = getUserState();
</script>

<div class={$userState?.user_id === chatObj.user_id ? 'flex flex-row-reverse' : 'block'}>
	<div
		class={$userState?.user_id === chatObj.user_id
			? 'flex flex-row-reverse gap-[10px] items-end'
			: 'flex gap-[10px] items-end'}
	>
		<div class="">
			<img
				src={chatObj.user_photo_link ?? sampleIcon}
				alt="sample-icon"
				class="w-[25px] h-[25px] rounded-full"
			/>
		</div>

		<div>
			<div class="flex flex-col w-full">
				<div class="flex items-center gap-[10px]">
					<div class="flex justify-end w-full">
						<p class="text-main text-[14px] font-semibold">
							{$userState?.user_id === chatObj.user_id ? 'You' : chatObj.user_fullname}
						</p>
					</div>
				</div>

				<div class="max-w-[276px] break-words">
					<p class="text-main text-[14px] rounded-lg p-[10px] bg-subwhite max-w-fit">
						{chatObj.guild_chat}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
