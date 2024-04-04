<script lang="ts">
	import { enhance } from '$app/forms';
	import { getAuthState } from '$lib';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import Description from './joined-contents/description.svelte';
	import Members from './joined-contents/members.svelte';

	const authState = getAuthState();
	console.log($authState.guilds.guildObj);
	const {
		guilds: { guildObj }
	} = $authState;

	const selections = ['Description', 'Members'];

	let activeItem = 'Description';
</script>

<div class="flex justify-between">
	<button
		class="underline text-main text-[14px] font-semibold"
		on:click={() => (($authState.guilds.joinedGuild = false), ($authState.guilds.guildObj = null))}
		>Back
	</button>

	<div class="flex gap-[10px]">
		<button
			class="underline bg-main text-submain px-[10px] text-[14px] font-semibold"
			on:click={() => alert('Comming soon.')}
			>Edit
		</button>

		<form method="post" action="/APIS?/deleteGuildAction" enctype="multipart/form-data" use:enhance>
			<button class="underline bg-main text-submain px-[10px] text-[14px] font-semibold"
				>Delete
			</button>
		</form>
	</div>
</div>

<div class="pt-[130px]">
	<div class="flex flex-col justify-center items-center gap-[10px]">
		<p class="text-[24px] text-main">{guildObj?.guild_name}</p>
		<div class="">
			<img src={groupIcon} alt="group-icon" />
			<p class="text-[14px] text-main">
				{guildObj?.joined_count}/{guildObj?.max_users}
			</p>
		</div>

		<div class="flex gap-[10px]">
			{#each selections as selection}
				<button
					on:click={() => (activeItem = selection)}
					class="text-main text-[14px] {activeItem === selection ? 'font-semibold' : ''}"
					>{selection}
				</button>
			{/each}
		</div>
	</div>

	<div class="">
		{#if activeItem === 'Description'}
			<Description />
		{:else}
			<Members />
		{/if}
	</div>
</div>
