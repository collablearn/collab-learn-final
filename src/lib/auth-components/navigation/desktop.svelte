<script lang="ts">
	import { getAuthState } from '$lib';

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

	const authState = getAuthState();
</script>

<div class="flex flex-col gap-[17px] mt-[100px]">
	{#each selections as selection}
		<a
			on:click={() => ($authState.activeItem = selection.url)}
			href={selection.url}
			class="text-[21px] py-[30px] text-center w-full font-semibold {$authState.activeItem ===
			selection.url
				? 'text-submain bg-[#911F1F]'
				: 'text-white'}">{selection.title}</a
		>
	{/each}
</div>
