<script lang="ts">
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import { fade, scale } from 'svelte/transition';
	import createIcon from '$lib/assets/create_guild_icon_320.svg';

	import { getAuthState } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';

	let showAddNote = false;

	const authState = getAuthState();

	const {
		guilds: { guildObj }
	} = $authState;

	interface AddNoteVal {
		note: string[];
	}

	let addNoteLoader = false;

	const addNoteActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			const { status } = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					break;

				case 400:
					break;

				case 401:
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

			<div class="mt-[20px]">
				<textarea
					name="note"
					placeholder="Say something..."
					class="w-full outline-none border-[1px] border-main bg-submain text-[14px] text-main p-[10px]"
				/>
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
