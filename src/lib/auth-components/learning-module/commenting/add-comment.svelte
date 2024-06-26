<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getAuthState, getUserState } from '$lib';
	import type { CreatedModuleReference, ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient<any, 'public', any>;

	export let moduleObj: CreatedModuleReference | null;

	const userState = getUserState();
	const authState = getAuthState();

	const getModuleComments = async () => {
		const { data, error } = await supabase
			.from('module_comments_tb')
			.select('*')
			.match({ module_id: moduleObj?.id });

		if (error) return toast.error('Get Comments', { description: error.message });

		$authState.modules.moduleComments = data;
	};

	interface AddCommentVal {
		commentValue: string[];
	}
	let addCommentLoader = false;
	let formActionError: AddCommentVal | null = null;
	let commentValue = '';

	const addCommentActionNews: SubmitFunction = () => {
		addCommentLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: AddCommentVal }>;

			switch (status) {
				case 200:
					commentValue = '';
					formActionError = null;
					addCommentLoader = false;
					await getModuleComments();
					break;

				case 400:
					formActionError = errors;
					addCommentLoader = false;
					break;

				case 401:
					formActionError = null;
					toast.error('Add Comment', { description: msg });
					addCommentLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="/APIS?/addCommentAction"
	enctype="multipart/form-data"
	use:enhance={addCommentActionNews}
>
	<input name="moduleId" type="hidden" class="hidden" value={moduleObj?.id} />
	<input name="userObj" type="hidden" class="hidden" value={JSON.stringify($userState)} />
	<div class="">
		<label>
			<span class="text-main text-[14px] transition-all">Add Comment</span>
			<textarea
				bind:value={commentValue}
				disabled={addCommentLoader}
				name="commentValue"
				placeholder="Say something..."
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.commentValue ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>
	</div>

	<button
		disabled={addCommentLoader}
		type="submit"
		class="{addCommentLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
		transition-all active:bg-main/50 w-full rounded-[10px] text-[14px] font-semibold py-[10px] mt-[10px] px-[2px] flex items-center justify-center text-submain"
	>
		{#if addCommentLoader}
			Sending...
		{:else}
			Add Comment
		{/if}
	</button>
</form>

<style>
	::placeholder {
		color: #800000;
		opacity: 1; /* Firefox */
	}

	::-ms-textarea-placeholder {
		/* Edge 12 -18 */
		color: #800000;
	}
</style>
