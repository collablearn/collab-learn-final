<script lang="ts">
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import { fade, scale } from 'svelte/transition';
	import { getAuthState, getUserState } from '$lib';
	import type { CreatedGuildReference, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let guildObj: CreatedGuildReference;

	export let showPublicJoin = false;

	const authState = getAuthState();
	const userState = getUserState();

	const userAndGuildObj = {
		user_id: $userState?.user_id,
		user_photo_link: $userState?.user_photo_link,
		user_fullname: $userState?.user_fullname,
		guild_id: guildObj.id,
		guild_name: guildObj.guild_name,
		guild_host_name: guildObj.host_name,
		guild_image_url: guildObj.image_url
	};

	let publicJoinLoader = false;
	const publicJoinActionNews: SubmitFunction = () => {
		publicJoinLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Join Guild', { description: msg });
					$authState.guilds.guildObj = guildObj;
					//faker hhaha
					$authState.guilds.guildObj.joined_count++;
					publicJoinLoader = false;
					$authState.guilds.joinedGuild = true;
					break;

				case 401:
					toast.error('Join Guild', { description: msg });
					publicJoinLoader = false;
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
					action="/APIS?/publicJoinAction"
					enctype="multipart/form-data"
					use:enhance={publicJoinActionNews}
				>
					<input
						autocomplete="off"
						name="userAndGuildObj"
						type="hidden"
						class="hidden"
						value={JSON.stringify(userAndGuildObj)}
					/>
					<button
						type="submit"
						class="bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
					>
						Join
					</button>
				</form>

				<button
					type="button"
					on:click={() => (showPublicJoin = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[8px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</div>
	</div>
{/if}
