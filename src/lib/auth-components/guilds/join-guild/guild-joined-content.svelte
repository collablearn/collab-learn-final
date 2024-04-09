<script lang="ts">
	import { enhance } from '$app/forms';
	import { getAuthState, getUserState } from '$lib';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Description from './joined-contents/description.svelte';
	import Members from './joined-contents/members.svelte';
	import type { GuildWallReference, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { goto, invalidateAll } from '$app/navigation';
	import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
	import { tick } from 'svelte';

	export let supabase: SupabaseClient<any, 'public', any>;

	const authState = getAuthState();
	const userState = getUserState();

	const {
		guilds: { guildObj }
	} = $authState;

	const selections = ['Description', 'Members'];

	let activeItem = 'Description';
	let deleteGuildLoader = false;

	const deleteGuildActionNews: SubmitFunction = () => {
		deleteGuildLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					supabase.removeAllChannels();
					invalidateAll();
					toast.success('Guild', { description: msg });
					window.location.reload();
					break;

				case 401:
					toast.error('Guild', { description: msg });
					deleteGuildLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};

	const getWallChats = async () => {
		const { data, error } = await supabase.from('guild_wall_tb').select('*').match({
			guild_id: $authState.guilds.guildObj?.id
		});

		if (error) return toast.error('Getting Wall Chats', { description: error.message });

		$authState.guilds.guildNotes = data;
	};

	getWallChats();
</script>

<div class="p-[22px]">
	<div class="flex justify-between">
		<button
			class="underline text-main text-[14px] font-semibold"
			on:click={() => {
				goto('/guilds');
				$authState.guilds.guildNotes = null;
				$authState.guilds.joinedGuild = false;
				$authState.guilds.guildObj = null;
				supabase.removeAllChannels();
			}}
			>Back
		</button>

		{#if guildObj?.user_id === $userState?.user_id}
			<div class="flex items-center gap-[10px]">
				<!-- <form>
					<button
						class="underline bg-main text-submain px-[10px] text-[14px] font-semibold"
						on:click={() =>
							alert('This is coming soon, this is not a wordpress application take it easy.')}
						>Edit
					</button>
				</form> -->

				<form
					method="post"
					action="/APIS?/deleteGuildAction"
					enctype="multipart/form-data"
					use:enhance={deleteGuildActionNews}
				>
					<input name="guildObj" type="hidden" class="hidden" value={JSON.stringify(guildObj)} />
					<button
						disabled={deleteGuildLoader}
						class="{deleteGuildLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
					underline transition-all active:bg-main/50 text-submain px-[10px] text-[14px] font-semibold"
					>
						{#if deleteGuildLoader}
							Deleting...
						{:else}
							Delete
						{/if}
					</button>
				</form>
			</div>
		{/if}
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
				<Description {supabase} />
			{:else}
				<Members {supabase} />
			{/if}
		</div>
	</div>
</div>
