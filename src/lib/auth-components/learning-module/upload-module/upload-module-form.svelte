<script lang="ts">
	import uploadIcon from '$lib/assets/upload_icon.svg';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import type { ResultModel } from '$lib/types';
	import { fade } from 'svelte/transition';

	let file: FileList | undefined;

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
					toast.success('Upload Module', { description: msg });
					uploadModuleLoader = false;
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
	<div class="flex flex-col gap-[10px]">
		{#if file}
			<div class="w-full" in:fade>
				<button
					on:click={() => (file = undefined)}
					type="button"
					class=" transition-all w-full active:bg-main/50 justify-between text-[14px] text-submain px-[20px] rounded-[10px] font-semibold bg-main h-[40px] flex items-center gap-[10px]"
				>
					<p class="truncate">
						{file[0].name}
					</p>
					<div class="">Close</div>
				</button>
			</div>
		{:else}
			<div class="flex items-end" in:fade>
				<div class="flex flex-col gap-[10px]">
					<label class="max-w-fit">
						<div
							class="transition-all active:bg-main/80 cursor-pointer max-w-fit text-[14px] font-semibold h-[40px] rounded-[10px] bg-main text-submain px-[10px] flex items-center"
						>
							<div class="flex items-end gap-[10px]">
								<img src={uploadIcon} alt="upload-icon" />
								<span>Upload Module</span>
								<input
									disabled={uploadModuleLoader}
									autocomplete="off"
									type="file"
									name="uploadModule"
									class="hidden"
									bind:files={file}
									accept=".pdf, .ppt, .pptx, .doc, .docx, .xls, .xlsx"
								/>
							</div>
						</div>
					</label>

					{#each formActionError?.uploadModule ?? [] as errMsg}
						<p class="text-main text-[14px]" in:fade>{errMsg}</p>
					{/each}
				</div>
			</div>
		{/if}
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
</style>
