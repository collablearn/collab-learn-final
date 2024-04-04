<script lang="ts">
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import { fade, scale } from 'svelte/transition';
	import { getAuthState, getUserState } from '$lib';
	import type { CreatedGuildReference, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let guildObj: CreatedGuildReference;

	export let showPublicJoin = false;

	const authState = getAuthState();
	const userState = getUserState();

	const userAndGuildObj = {
		client_user_id: $userState?.user_id,
		client_user_photo_link: $userState?.user_photo_link,
		client_user_fullname: $userState?.user_fullname,
		client_guild_id: guildObj.id,
		client_guild_name: guildObj.guild_name
	};

	let checkPasscodeLoader = false;
	const checkPasswordActionNews: SubmitFunction = () => {
		checkPasscodeLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Join Guild', { description: msg });
					$authState.guilds.guildObj = guildObj;
					checkPasscodeLoader = false;
					$authState.guilds.joinedGuild = true;
					break;

				case 401:
					toast.error('Join Guild', { description: msg });
					checkPasscodeLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

{#if showPublicJoin}
	<div
		class="fixed left-0 right-0 bottom-0 top-0 bg-[#00000050] z-10 flex items-center justify-center"
	>
		<div class="bg-submain py-[50px] px-[22px] w-full relative" in:scale out:fade>
			<div class="flex flex-col gap-[10px]">
				<h3 class="text-[24px] text-main">{guildObj.guild_name}</h3>
				<p class="text-[14px] text-main">{guildObj.description}</p>
			</div>

			<div class="flex items-center gap-[5px] absolute top-0 right-0 m-[20px]">
				<img src={groupIcon} alt="group-icon" />
				<p class="text-[14px] text-main">{guildObj.joined_count}/{guildObj.max_users}</p>
			</div>

			<div class="mt-[30px] flex flex-col gap-[10px]">
				<form
					method="post"
					action="/APIS?/checkPasswordAction"
					enctype="multipart/form-data"
					use:enhance={checkPasswordActionNews}
				>
					<input
						name="userAndGuildObj"
						type="hidden"
						class="hidden"
						value={JSON.stringify(userAndGuildObj)}
					/>
					<button
						on:click={() => {
							$authState.guilds.guildObj = guildObj;
							$authState.guilds.joinedGuild = true;
						}}
						class="bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
					>
						Join
					</button>
				</form>

				<button
					on:click={() => (showPublicJoin = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[8px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</div>
	</div>
{/if}
