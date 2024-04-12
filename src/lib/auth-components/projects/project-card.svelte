<script lang="ts">
	import sampleIcon from '$lib/assets/guild_sample_icon_320.svg';
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import lockIcon from '$lib/assets/project_lock_icon_320.svg';

	import { getAuthState } from '$lib';
	import type { CreatedGuildReference, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	let showPrivateJoin = false;
	let showPublicJoin = false;
	let checkIfJoinLoader = false;

	/* const checkIfJoinedActionNews: SubmitFunction = () => {
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
	}; */
</script>

<form
	method="post"
	action="/APIS?/checkIfJoinedAction"
	enctype="multipart/form-data"
	class="w-full h-full"
>
	<input name="guildId" type="hidden" class="hidden" />
	<!-- {#if guildObj.is_private}
		<PrivateJoin bind:showPrivateJoin {guildObj} />
	{:else}
		<PublicJoin bind:showPublicJoin {guildObj} />
	{/if} -->
	<button
		type="submit"
		disabled={checkIfJoinLoader}
		class="bg-subwhite h-full w-full mb-[20px] p-[20px] rounded-[10px] relative shadow-sm shadow-black text-left flex flex-col gap-[10px] break-words"
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
			<h3 class="text-[16px] text-main font-semibold line-clamp-1">Sample Name</h3>
		</div>
		<div class="flex flex-col sm:flex-row gap-[20px]">
			<!--For guild image-->
			<div class="">
				<img src={sampleIcon} alt="sample-icon" class="rounded-[10px]" />
			</div>

			<div class="flex flex-col gap-[10px] w-full">
				<div class="">
					<p class="text-[14px] font-semibold text-main">Host:</p>
					<p class="text-[14px] text-main">Mike John</p>
				</div>

				<div class="">
					<p class="text-[14px] font-semibold text-main">Description:</p>

					<p class="text-[14px] text-main line-clamp-3 whitespace-pre-wrap max-w-full break-all">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi ullam rem dolorum iure
						quas. Nostrum fuga quis facere eligendi consequuntur. Eligendi iure omnis, ad quisquam
						explicabo laboriosam tenetur? Non, libero?
					</p>
				</div>
			</div>
		</div>

		<div class="absolute bottom-0 left-0 right-0 mb-[10px] px-[20px] w-full">
			<div class="flex items-center justify-between">
				{#if true}
					<div title="This guild is private." class="flex items-center gap-[10px]">
						<img src={lockIcon} alt="lock-icon" class="" />
						<p class="text-[14px] text-main">Locked</p>
					</div>
				{/if}

				<div class="flex items-center justify-end w-full gap-[5px]">
					<img src={groupIcon} alt="group-icon" />
					<p class="text-[14px] text-main">2/20</p>
				</div>
			</div>
		</div>
	</button>
</form>
