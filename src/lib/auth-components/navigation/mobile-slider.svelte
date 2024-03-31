<script lang="ts">
	import closeIcon from '$lib/assets/close_icon_320.svg';
	import sampleDisplayIcon from '$lib/assets/sampelDisplayIcon.svg';
	import { getAuthState, getUserState } from '$lib';
	import { fly } from 'svelte/transition';

	export let selections: { title: string; url: string }[];

	export let showMobileSlider = false;

	let authState = getAuthState();

	const userState = getUserState();
</script>

{#if showMobileSlider}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050]"
		on:click|self={() => (showMobileSlider = false)}
	>
		<div
			class="fixed left-0 top-0 bottom-0 bg-main w-[260px] px-[20px] py-[20px]"
			in:fly={{ x: -200, duration: 450 }}
		>
			<div class="flex justify-end">
				<button class="p-2" on:click={() => (showMobileSlider = false)}>
					<img src={closeIcon} alt="close-icon" class="" />
				</button>
			</div>

			<div class="flex items-center gap-[9px] mt-[35px]">
				<div class="flex max-w-fit">
					<img
						src={$userState?.user_metadata.profileLink ?? sampleDisplayIcon}
						alt="sample-display-icon"
						class="w-[79px] h-[79px] rounded-full"
					/>
				</div>

				<div class="">
					<a
						href="/edit-profile"
						class="text-[14px] text-submain underline"
						on:click={() => (showMobileSlider = false)}>EDIT PROFILE</a
					>
				</div>
			</div>

			<div class="mt-[25px]">
				<p class="text-[16px] text-subwhite font-bold">
					{$userState?.user_metadata.fullname}
				</p>

				<div class="text-[14px] text-subwhite mt-[20px] rounded-[10px] max-h-[100px] overflow-auto">
					<p>{$userState?.user_metadata.bio ?? 'You have no bio.'}</p>
				</div>
			</div>

			<hr class="border-[1px] border-white my-[20px]" />

			<div class="flex flex-col gap-[10px]">
				{#each selections as selection}
					<a
						on:click={() => {
							showMobileSlider = false;
							$authState.activeItem = selection.url;
						}}
						href={selection.url}
						class="py-[10px] px-[20px] text-left font-semibold text-[16px]
                    {$authState.activeItem === selection.url
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
