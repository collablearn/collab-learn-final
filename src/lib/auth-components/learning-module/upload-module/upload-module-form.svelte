<script lang="ts">
	import uploadIcon from '$lib/assets/upload_icon.svg';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import type { ResultModel } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { getUserState } from '$lib';
	import { goto, invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';

	const userState = getUserState();

	let files: FileList | undefined;

	interface UploadModuleVal {
		uploadModule: string[];
		moduleName: string[];
		description: string[];
	}

	interface UploadModuleAction {
		msg: string;
		errors: UploadModuleVal;
	}

	let formActionError: UploadModuleVal | null = null;
	let uploadModuleLoader = false;

	const uploadModuleActionNews: SubmitFunction = () => {
		uploadModuleLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<UploadModuleAction>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Upload Module', { description: msg });
					uploadModuleLoader = false;
					await tick();
					goto('/learning-modules');
					break;

				case 400:
					formActionError = errors;
					uploadModuleLoader = false;
					break;

				case 401:
					toast.error('Upload Module', { description: msg });
					uploadModuleLoader = false;
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
	action="/APIS?/uploadModuleAction"
	enctype="multipart/form-data"
	use:enhance={uploadModuleActionNews}
>
	<input autocomplete="off" name="hostName" type="hidden" value={$userState?.user_fullname} />
	<input autocomplete="off" name="hostPhoto" type="hidden" value={$userState?.user_photo_link} />

	<div class="flex flex-col gap-[10px]">
		<input
			disabled={uploadModuleLoader}
			autocomplete="off"
			type="file"
			name="uploadModule"
			class="text-main text-[14px] max-w-fit"
			bind:files
			accept=".pdf, .ppt, .pptx, .doc, .docx, .xls, .xlsx"
		/>
		{#each formActionError?.uploadModule ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}

		<label>
			<span class="text-main text-[14px] transition-all">Module Title</span>
			<input
				disabled={uploadModuleLoader}
				name="moduleName"
				type="text"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.moduleName ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>

		<label>
			<span class="text-main text-[14px] transition-all">Description</span>
			<textarea
				disabled={uploadModuleLoader}
				name="description"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.description ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>
	</div>

	<div class="flex flex-col gap-[10px] mt-[40px]">
		<button
			disabled={uploadModuleLoader}
			type="submit"
			class="{uploadModuleLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
			 w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
		>
			{#if uploadModuleLoader}
				Uploading...
			{:else}
				Upload
			{/if}
		</button>

		<a
			href="/learning-modules"
			class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
		>
			Back
		</a>
	</div>
</form>

<style>
	input {
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE/Edge */
		user-select: none; /* Standard syntax */
	}

	input::file-selector-button {
		font-weight: bold;
		color: #e9ba46;
		border-radius: 10px;
		background-color: #800000;
		height: 40px;
		border: none;
		padding-left: 10px;
		padding-right: 10px;
	}
</style>
