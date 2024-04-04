<script lang="ts">
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import { fade, scale } from 'svelte/transition';
	import createIcon from '$lib/assets/create_guild_icon_320.svg';

	import { getAuthState, getUserState } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { GuildWallReference, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

	let showAddNote = false;

	const authState = getAuthState();
	const userState = getUserState();

	const {
		guilds: { guildObj }
	} = $authState;

	interface AddNoteVal {
		guildNote: string[];
	}

	let addNoteLoader = false;
	let formActionError: AddNoteVal | null = null;
	const addNoteActionNews: SubmitFunction = () => {
		addNoteLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors, guildNotes }
			} = result as ResultModel<{
				msg: string;
				errors: AddNoteVal;
				guildNotes: GuildWallReference[];
			}>;

			switch (status) {
				case 200:
					toast.success('Add Note', { description: msg });
					formActionError = null;
					addNoteLoader = false;
					$authState.guilds.guildNotes = guildNotes;
					showAddNote = false;
					break;

				case 400:
					formActionError = errors;
					addNoteLoader = false;
					break;

				case 401:
					toast.error('Add Note', { description: msg });
					formActionError = null;
					addNoteLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<div class="fixed bottom-0 right-0 mr-[33px] mb-[33px]">
	<button class="transition-all active:scale-105" on:click={() => (showAddNote = true)}>
		<img src={createIcon} alt="add-description-icon" />
	</button>
</div>

{#if showAddNote}
	<div
		class="fixed left-0 right-0 bottom-0 top-0 bg-[#00000050] z-10 flex items-center justify-center"
	>
		<form
			method="post"
			action="/guilds?/addNoteAction"
			enctype="multipart/form-data"
			use:enhance={addNoteActionNews}
			class="bg-submain py-[50px] px-[22px] w-full relative"
			in:scale
			out:fade
		>
			<div class="flex flex-col gap-[10px]">
				<h3 class="text-[24px] text-main">Add Note</h3>
				<p class="text-[14px] text-main">What’s your thought right now?</p>
			</div>

			<input name="guildId" type="hidden" class="hidden" value={$authState.guilds.guildObj?.id} />
			<input name="userFullname" type="hidden" class="hidden" value={$userState?.user_fullname} />
			<input
				name="userPhotoLink"
				type="hidden"
				class="hidden"
				value={$userState?.user_photo_link}
			/>
			<div class="mt-[20px]">
				<textarea
					name="guildNote"
					placeholder="Say something..."
					class="w-full outline-none border-[1px] border-main bg-submain text-[14px] text-main p-[10px]"
				/>
				{#each formActionError?.guildNote ?? [] as errMsg}
					<p class="text-main text-[14px]" in:fade>{errMsg}</p>
				{/each}
			</div>

			<div class="mt-[30px] flex flex-col gap-[10px]">
				<button
					disabled={addNoteLoader}
					type="submit"
					class="{addNoteLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
					 w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
				>
					{#if addNoteLoader}
						Posting...
					{:else}
						Post
					{/if}
				</button>

				<button
					type="button"
					on:click={() => (showAddNote = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[8px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</form>
	</div>
{/if}

<style>
	::placeholder {
		color: #800000;
		opacity: 1; /* Firefox */
	}

	::-ms-input-placeholder {
		/* Edge 12-18 */
		color: #800000;
	}
</style>
