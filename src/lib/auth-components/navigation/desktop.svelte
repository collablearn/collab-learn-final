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

<div class="flex flex-col gap-[20px] mt-[100px]">
	{#each selections as selection}
		<a href={selection.url} class="text-[20px] p-[10px] w-full font-semibold text-submain bg-black"
			>{selection.title}</a
		>
	{/each}
</div>
