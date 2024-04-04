<script lang="ts">
	import sampleIcon from '$lib/assets/guild_sample_icon_320.svg';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import lockIcon from '$lib/assets/project_lock_icon_320.svg';
	import PrivateJoin from './join-guild/private-join.svelte';
	import PublicJoin from './join-guild/public-join.svelte';

	import { getAuthState } from '$lib';
	import type { CreatedGuildReference, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let guildObj: CreatedGuildReference;
	const authState = getAuthState();

	let showPrivateJoin = false;
	let showPublicJoin = false;
	let checkIfJoinLoader = false;

	const checkIfJoinedActionNews: SubmitFunction = () => {
		checkIfJoinLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					$authState.guilds.joinedGuild = true;
					$authState.guilds.guildObj = guildObj;
					toast.success('Joined', { description: 'Welcome Back!' });
					break;

				case 400:
					guildObj.is_private ? (showPrivateJoin = true) : (showPublicJoin = true);
					checkIfJoinLoader = false;
					break;

				case 401:
					toast.error('Check If Join', { description: msg });
					checkIfJoinLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

{#if guildObj.is_private}
	<PrivateJoin bind:showPrivateJoin {guildObj} />
{:else}
	<PublicJoin bind:showPublicJoin {guildObj} />
{/if}

<form
	method="post"
	action="/APIS?/checkIfJoinedAction"
	enctype="multipart/form-data"
	use:enhance={checkIfJoinedActionNews}
>
	<input name="guildId" type="hidden" class="hidden" value={guildObj.id} />
	<button
		type="submit"
		disabled={checkIfJoinLoader}
		class="bg-subwhite px-[13px] h-[308px] w-full py-[16px] rounded-[10px] shadow-sm shadow-black flex flex-col gap-[10px] relative"
	>
		{#if checkIfJoinLoader}
			<div
				class="absolute left-0 right-0 top-0 bottom-0 bg-[#0000009a] flex flex-col items-center justify-center rounded-[10px]"
			>
				<div class="flex flex-col items-center gap-[20px] text-submain">
					<div
						class="w-10 h-10 border-[5px] border-b-submain rounded-full animate-spin border-[#0000009a]"
					></div>
					<p class="font-bold">Checking if joined</p>
				</div>
			</div>
		{/if}

		<p class="text-[16px] text-main text-left font-semibold">
			{guildObj.guild_name}
		</p>

		<div class="flex flex-col gap-[10px] w-full">
			<div class="mx-auto">
				<img src={sampleIcon} alt="sample-icon" />
			</div>

			<div class="h-[100px]">
				<div class="text-[16px] text-main flex flex-col gap-[20px] text-left">
					<p class="font-semibold">Host: {guildObj.host_name}</p>
					<p title={guildObj.description} class="line-clamp-2">
						{guildObj.description}
					</p>
				</div>
			</div>
		</div>

		<div class="flex {guildObj.is_private ? 'justify-between' : 'justify-end'} items-center w-full">
			{#if guildObj.is_private}
				<div class="">
					<img src={lockIcon} alt="lock-icon" />
				</div>
			{/if}

			<div class="flex items-center gap-[5px]">
				<img src={groupIcon} alt="group-icon" />
				<p class="text-[14px] text-main">{guildObj.joined_count}/{guildObj.max_users}</p>
			</div>
		</div>
	</button>
</form>
