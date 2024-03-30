<script lang="ts">
	import burgerIcon from '$lib/assets/burger.svg';
	import userIcon from '$lib/assets/user_icon_320.svg';
	import { fly, scale } from 'svelte/transition';
	import MobileSlider from './navigation/mobile-slider.svelte';
	import UserModal from './navigation/user-modal.svelte';
	import { getUserState } from '$lib';

	export let showUserMenu = false;
	export let showMobileSlider = false;

	const userState = getUserState();

	let selections = [
		{
			title: 'DASHBOARD',
			url: '/dashboard'
		},
		{
			title: 'GUILDS',
			url: '/guilds'
		},

		{
			title: 'PROJECTS',
			url: '/projects'
		},

		{
			title: 'LEARNING MODULES',
			url: '/learning-modules'
		}
	];
</script>

<nav class="bg-main w-full px-[23px] py-[20px]">
	<div class="flex items-center justify-between">
		<div>
			<button on:click={() => (showMobileSlider = true)}>
				<img src={burgerIcon} alt="burger-icon" />
			</button>
		</div>

		<div class="flex items-center justify-center">
			<button on:click={() => (showUserMenu = true)}>
				<img
					src={$userState?.user_metadata.profileLink ?? userIcon}
					alt="user-icon"
					class="w-[25px] h-[25px] rounded-full"
				/>
			</button>
		</div>
	</div>
</nav>

{#if showUserMenu}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click|self={() => (showUserMenu = false)}
		class="fixed left-0 right-0 top-0 bottom-0 bg-[#00000050] flex flex-row-reverse pt-[74px] pr-[20px]"
	>
		<div class="w-[150px] h-fit" in:fly={{ x: 80, duration: 300 }}>
			<UserModal />
		</div>
	</div>
{/if}

<MobileSlider {selections} bind:showMobileSlider />
