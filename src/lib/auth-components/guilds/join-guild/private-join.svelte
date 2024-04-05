<script lang="ts">
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import { fade, scale } from 'svelte/transition';
	import { getAuthState, getUserState } from '$lib';
	import type { CreatedGuildReference, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let guildObj: CreatedGuildReference;

	export let showPrivateJoin = false;

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

	interface CheckPasscodeVal {
		passcode: string[];
	}

	let formActionError: CheckPasscodeVal | null = null;
	let checkPasscodeLoader = false;
	const checkPasswordActionNews: SubmitFunction = () => {
		checkPasscodeLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: CheckPasscodeVal }>;

			switch (status) {
				case 200:
					toast.success('Join Guild', { description: msg });
					formActionError = null;
					$authState.guilds.guildObj = guildObj;
					checkPasscodeLoader = false;
					$authState.guilds.joinedGuild = true;
					break;

				case 400:
					formActionError = errors;
					checkPasscodeLoader = false;
					break;

				case 401:
					toast.error('Join Guild', { description: msg });
					formActionError = null;
					checkPasscodeLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

{#if showPrivateJoin}
	<div
		class="fixed left-0 right-0 bottom-0 top-0 bg-[#00000050] z-10 flex items-center justify-center"
	>
		<form
			method="post"
			action="/APIS?/checkPasswordAction"
			enctype="multipart/form-data"
			use:enhance={checkPasswordActionNews}
			class="bg-submain py-[50px] px-[22px] w-full relative"
			in:scale
			out:fade
		>
			<div class="flex flex-col gap-[10px]">
				<h3 class="text-[24px] text-main">{guildObj.guild_name}</h3>
				<p class="text-[14px] text-main">{guildObj.description}</p>
			</div>

			<div class="flex items-center gap-[5px] absolute top-0 right-0 m-[20px]">
				<img src={groupIcon} alt="group-icon" />
				<p class="text-[14px] text-main">{guildObj.joined_count}/{guildObj.max_users}</p>
			</div>

			<input
				autocomplete="off"
				name="userAndGuildObj"
				type="hidden"
				class="hidden"
				value={JSON.stringify(userAndGuildObj)}
			/>

			<div class="mt-[20px]">
				<label>
					<span class="text-main text-[14px] transition-all">Passcode</span>
					<input
						autocomplete="off"
						name="passcode"
						type="password"
						class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
					/>
					{#each formActionError?.passcode ?? [] as errMsg}
						<p class="text-main text-[14px]" in:fade>{errMsg}</p>
					{/each}
				</label>
			</div>

			<div class="mt-[30px] flex flex-col gap-[10px]">
				<button
					disabled={checkPasscodeLoader}
					type="submit"
					class="{checkPasscodeLoader ? 'bg-main/50 cursor-not-allowed' : 'bg-main'}
					active:bg-main/50 w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
				>
					{#if checkPasscodeLoader}
						Joining...
					{:else}
						Join
					{/if}
				</button>

				<button
					type="button"
					on:click={() => (showPrivateJoin = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[8px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</form>
	</div>
{/if}
