<script lang="ts">
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import { fade, scale } from 'svelte/transition';
	import { getAuthState, getUserState } from '$lib';
	import type { CreatedProjectReference, ResultModel } from '$lib/types';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let projectObj: CreatedProjectReference;
	export let showPrivateJoin = false;

	const authState = getAuthState();
	const userState = getUserState();

	const userAndProjectObj = {
		user_id: $userState?.user_id,
		user_photo_link: $userState?.user_photo_link,
		user_fullname: $userState?.user_fullname,
		project_id: projectObj.id,
		project_name: projectObj.project_name,
		project_host_name: projectObj.host_name,
		project_image_url: projectObj.image_url
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
					invalidateAll();
					toast.success('Join Project', { description: msg });
					formActionError = null;
					$authState.projects.projectObj = projectObj;
					//faker hhaha
					$authState.projects.projectObj.joined_count++;
					checkPasscodeLoader = false;
					$authState.projects.joinedProject = true;
					break;

				case 400:
					formActionError = errors;
					checkPasscodeLoader = false;
					break;

				case 401:
					toast.error('Join Project', { description: msg });
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
	<form
		method="post"
		action="/APIS?/checkPasswordProjAction"
		enctype="multipart/form-data"
		use:enhance={checkPasswordActionNews}
		class="absolute px-[10px] left-0 right-0 bottom-0 top-0 bg-[#00000050] z-10 flex items-center justify-center"
	>
		<div
			class="bg-submain py-[50px] px-[22px] w-full md:w-[600px] rounded-[10px]"
			in:scale
			out:fade
		>
			<div class="flex flex-col gap-[10px]">
				<h3 class="text-[24px] text-main">{projectObj.project_name}</h3>
				<p class="text-[14px] text-main">{projectObj.description}</p>
			</div>

			<div class="flex items-center gap-[5px] absolute top-0 right-0 m-[20px]">
				<img src={groupIcon} alt="group-icon" />
				<p class="text-[14px] text-main">{projectObj.joined_count}/{projectObj.max_users}</p>
			</div>

			<input
				autocomplete="off"
				name="userAndProjectObj"
				type="hidden"
				class="hidden"
				value={JSON.stringify(userAndProjectObj)}
			/>

			<div class="mt-[20px]">
				<label>
					<span class="text-main text-[14px] transition-all">Passcode</span>
					<input
						disabled={checkPasscodeLoader}
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
					type="submit"
					disabled={checkPasscodeLoader}
					class="{checkPasscodeLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
					transition-all active:bg-main/50 w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
				>
					{#if checkPasscodeLoader}
						Joining....
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
		</div>
	</form>
{/if}
