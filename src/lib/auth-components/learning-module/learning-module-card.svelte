<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import learningModIcon from '$lib/assets/learning_mod_icon_320.svg';
	import { formatDate } from '$lib/helpers';
	import type { CreatedModuleReference, ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	export let moduleObj: CreatedModuleReference;

	let showLearningContent = false;
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
</script>

<div class="w-full">
	{#if showLearningContent}
		<div class="fixed left-0 right-0 top-0 bottom-0 bg-submain pt-[108px] px-[22px]">
			<form
				method="post"
				action="/APIS?/deleteModuleAction"
				enctype="multipart/form-data"
				use:enhance={deleteModuleActionNews}
				class="flex justify-end"
			>
				<input autocomplete="off" name="moduleId" type="hidden" value={moduleObj.id} />
				<input autocomplete="off" name="fileName" type="hidden" value={moduleObj.module_name} />
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
			<div class="flex items-center gap-[10px]">
				<img src={learningModIcon} alt="sample-icon" />
				<div class="flex flex-col gap-[2px]">
					<h3 class="text-[16px] text-main font-semibold">{moduleObj.module_name}</h3>
					<p class="text-[14px] text-main">{formatDate(moduleObj.created_at)}</p>
				</div>
			</div>

			<hr class="border-[1px] border-main my-[20px]" />

			<div class="">
				<p class="text-[14px] text-main">Attachments</p>

				<a
					title="Click to download"
					class="underline text-[14px] text-blue-700 italic"
					href={moduleObj.module_link}
					download>{moduleObj.file_name}</a
				>
			</div>

			<div class="mt-[90px]">
				<label>
					<span class="text-main text-[14px] transition-all">Add Comment</span>
					<textarea
						class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
					/>
				</label>
			</div>

			<div class="flex flex-col gap-[10px] mt-[10px]">
				<button
					disabled={deleteModuleLoader}
					class="bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
				>
					Add Comment
				</button>

				<button
					disabled={deleteModuleLoader}
					on:click={() => (showLearningContent = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</div>
	{:else}
		<button
			on:click={() => (showLearningContent = !showLearningContent)}
			class="bg-subwhite px-[13px] py-[16px] w-full rounded-[10px] shadow-sm shadow-black text-left"
		>
			<div class="flex items-center gap-[20px]">
				<div class="">
					<img src={learningModIcon} alt="sample-icon" />
				</div>

				<div class="flex flex-col gap-[5px] w-full">
					<p class="text-[16px] text-main font-semibold">{moduleObj.host_name}</p>
					<p class="text-[14px] text-main">Uploaded a module:</p>
					<p class="text-[14px] text-main">{formatDate(moduleObj.created_at)}</p>
				</div>
			</div>
		</button>
	{/if}
</div>
