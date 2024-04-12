<script lang="ts">
	import sampleIcon from '$lib/assets/description_icon_320_sample.svg';
	import { checkIfhavePhoto, formatDate } from '$lib/helpers';
	import type { ModuleCommentsReference } from '$lib/types';

	import { fade } from 'svelte/transition';

	export let moduleObj: ModuleCommentsReference;
	let showDate = false;
</script>

<div class="">
	<div class="flex gap-[10px]">
		<div class="w-[25px]">
			<img
				src={checkIfhavePhoto(moduleObj?.user_photo_link ?? '', sampleIcon)}
				alt="profile-icon"
				class="w-full rounded-full"
			/>
		</div>
		<div class="">
			<button class="w-[270px] text-left max-w-fit" on:click={() => (showDate = !showDate)}>
				<p class="text-[14px] font-semibold text-main">{moduleObj.user_fullname}</p>
				<p class="text-[14px] text-main break-words">
					{moduleObj.module_comment}
				</p>
			</button>
		</div>
	</div>
	{#if showDate}
		<div class="" in:fade>
			<p class="text-[10px] text-main">{formatDate(moduleObj.created_at)}</p>
		</div>
	{/if}
</div>
