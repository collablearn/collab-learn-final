<script lang="ts">
	import closeIcon from '$lib/assets/close_icon_320.svg';
	import sampleDisplayIcon from '$lib/assets/sampelDisplayIcon.svg';
	import { page } from '$app/stores';

	export let selections: { title: string; url: string }[];

	export let showMobileSlider = false;
</script>

{#if showMobileSlider}
	<div class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050]">
		<div class="fixed left-0 top-0 bottom-0 bg-main w-[260px] px-[20px] py-[20px]">
			<div class="flex justify-end">
				<button class="p-2" on:click={() => (showMobileSlider = false)}>
					<img src={closeIcon} alt="close-icon" class="" />
				</button>
			</div>

			<div class="flex items-center gap-[9px] mt-[35px]">
				<div class="flex max-w-fit">
					<img src={sampleDisplayIcon} alt="sample-display-icon" class="" />
				</div>

				<div class="">
					<button class="text-[14px] text-submain underline">EDIT PROFILE</button>
				</div>
			</div>

			<div class="mt-[25px]">
				<p class="text-[16px] text-subwhite font-bold">JUAN DELA CRUZ JR.</p>

				<div class="text-[14px] text-subwhite mt-[20px]">
					<div class="flex items-center gap-[2px]">
						<p class="font-semibold">Student ID :</p>
						<p class=" font-semibold">12345678</p>
					</div>

					<div class="flex items-center gap-[2px]">
						<p class="font-semibold">Year and Section :</p>
						<p class=" font-semibold">11 - Makatao</p>
					</div>
				</div>
			</div>

			<hr class="border-[1px] border-white my-[20px]" />

			<div class="flex flex-col gap-[10px]">
				{#each selections as selection}
					<a
						on:click={() => (showMobileSlider = false)}
						href={selection.url}
						class="py-[10px] px-[20px] text-left font-semibold text-[16px]
                    {$page.url.pathname === selection.url
							? 'bg-[#911F1F] text-submain'
							: 'bg-main text-subwhite'} "
					>
						{selection.title}
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}
