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
	import { invalidateAll } from '$app/navigation';

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
					invalidateAll();
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
		class="bg-subwhite w-full px-[13px] py-[16px] rounded-[10px] relative shadow-sm shadow-black text-left flex flex-col gap-[10px] break-words"
	>
		{#if checkIfJoinLoader}
			<div
				class="absolute left-0 right-0 top-0 bottom-0 bg-[#0000009a] flex flex-col items-center justify-center rounded-[10px] z-10"
			>
				<div class="flex flex-col items-center gap-[20px] text-submain">
					<div
						class="w-10 h-10 border-[5px] border-b-submain rounded-full animate-spin border-[#0000009a]"
					></div>
					<p class="font-bold">Checking if joined</p>
				</div>
			</div>
		{/if}

		<div class="">
			<h3 class="text-[16px] text-main font-semibold line-clamp-1">
				{guildObj.guild_name}
			</h3>
		</div>
		<div class="flex gap-[10px] w-full">
			<!--For guild image-->
			<div class="w-[20%]">
				<img src={guildObj.image_url ?? sampleIcon} alt="sample-icon" class="" />
			</div>

			<!--For guild details-->
			<div class="w-[80%] flex flex-col gap-[10px]" title={guildObj.description}>
				<div class="flex items-center flex-wrap gap-[5px]">
					<p class="text-[14px] font-semibold text-main">Host:</p>
					<p class="text-[14px] text-main">{guildObj.host_name}</p>
				</div>

				<div class="flex items-center flex-wrap gap-[5px]">
					<p class="text-[14px] font-semibold text-main">Description:</p>

					<p class="text-[14px] text-main line-clamp-3 text-wrap">
						{guildObj.description}
					</p>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-between w-full">
			{#if guildObj.is_private}
				<img src={lockIcon} alt="lock-icon" class="" />
			{/if}

			<div class="flex items-center justify-end w-full gap-[5px]">
				<img src={groupIcon} alt="group-icon" />
				<p class="text-[14px] text-main">{guildObj.joined_count}/{guildObj.max_users}</p>
			</div>
		</div>
	</button>
</form>
