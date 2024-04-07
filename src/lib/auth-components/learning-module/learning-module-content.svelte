<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import learningModIcon from '$lib/assets/learning_mod_icon_320.svg';
	import { formatDate } from '$lib/helpers';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import AddComment from './commenting/add-comment.svelte';
	import { getAuthState, getUserState } from '$lib';
	import CommentCard from './commenting/comment-card.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import eyeIcon from '$lib/assets/eyeIcon.svg';

	export let supabase: SupabaseClient<any, 'public', any>;

	const authState = getAuthState();
	const userState = getUserState();

	const { moduleObj } = $authState.modules;

	const getModuleComments = async () => {
		const { data, error } = await supabase
			.from('module_comments_tb')
			.select('*')
			.match({ module_id: moduleObj?.id });

		if (error) return toast.error('Get Comments', { description: error.message });

		$authState.modules.moduleComments = data;
	};

	let deleteModuleLoader = false;

	const deleteModuleActionNews: SubmitFunction = () => {
		deleteModuleLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Delete Module', { description: msg });
					deleteModuleLoader = false;
					$authState.modules.showModule = false;
					break;

				case 401:
					toast.error('Delete Module', { description: msg });
					deleteModuleLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};

	getModuleComments();
</script>

<div class="left-0 right-0 top-0 bottom-0 bg-submain">
	<div class="flex items-center gap-[25px] justify-end">
		<button
			title="Click to see who viewed this."
			class=" text-main text-[14px] flex items-center gap-[5px] font-semibold transition-all active:underline"
		>
			<img src={eyeIcon} class="" alt="eye-icon" />
			400 Views
		</button>
		{#if $userState?.user_id === moduleObj?.user_id}
			<form
				method="post"
				action="/APIS?/deleteModuleAction"
				enctype="multipart/form-data"
				use:enhance={deleteModuleActionNews}
				class="flex justify-end"
			>
				<input autocomplete="off" name="moduleId" type="hidden" value={moduleObj?.id} />
				<input autocomplete="off" name="fileName" type="hidden" value={moduleObj?.module_name} />
				<button
					disabled={deleteModuleLoader}
					type="submit"
					class="{deleteModuleLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
				transition-all active:bg-main/50 text-submain text-[14px] px-[10px] rounded-[10px]"
				>
					{#if deleteModuleLoader}
						Deleting...
					{:else}
						Delete
					{/if}
				</button>
			</form>
		{/if}
	</div>
	<div class="flex items-center gap-[10px]">
		<img src={learningModIcon} alt="sample-icon" />
		<div class="flex flex-col gap-[2px]">
			<h3 class="text-[16px] text-main font-semibold">{moduleObj?.module_name}</h3>
			<p class="text-[14px] text-main">{formatDate(moduleObj?.created_at ?? '')}</p>
		</div>
	</div>

	<hr class="border-[1px] border-main my-[20px]" />

	<div class="break-words">
		<p class="text-[14px] text-main">Attachments</p>

		<a
			title="Click to download"
			class="underline text-[14px] text-blue-700 italic"
			href={moduleObj?.module_link}
			download>{moduleObj?.file_name}</a
		>
	</div>

	<!--Render Comments-->
	<div class="mt-[50px] flex flex-col gap-[20px]">
		{#each $authState.modules.moduleComments ?? [] as moduleObj}
			<CommentCard {moduleObj} />
		{/each}
	</div>

	<div class="flex flex-col gap-[10px] mt-[10px]">
		<AddComment {moduleObj} {supabase} />

		<button
			disabled={deleteModuleLoader}
			on:click={() => {
				$authState.modules.showModule = false;
				$authState.modules.moduleComments = null;
			}}
			class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
		>
			Back
		</button>
	</div>
</div>
