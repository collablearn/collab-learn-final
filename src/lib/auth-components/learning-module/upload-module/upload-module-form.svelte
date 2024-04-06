<script lang="ts">
	import { fade } from 'svelte/transition';
	import uploadIcon from '$lib/assets/upload_icon.svg';

	let file: FileList;
</script>

<div class="flex flex-col gap-[10px]">
	<div class={file ? 'hidden' : ''}>
		<label>
			<div
				class="transition-all active:bg-main/80 cursor-pointer max-w-fit text-[14px] font-semibold h-[40px] rounded-[10px] bg-main text-submain px-[10px] flex items-center"
			>
				<div class="flex items-end gap-[10px]">
					<img src={uploadIcon} alt="upload-icon" />
					<span>Upload Module</span>
					<input
						autocomplete="off"
						type="file"
						name="uploadProfile"
						class="hidden"
						bind:files={file}
						accept=".png, .jpg, .jpeg"
					/>
				</div>
			</div>
		</label>
	</div>

	<label>
		<span class="text-main text-[14px] transition-all">Module Title</span>
		<input
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Attachment</span>
		<input
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Description</span>
		<textarea
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>
</div>

<div class="flex flex-col gap-[10px] mt-[40px]">
	<button
		class="bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
	>
		Create
	</button>

	<a
		href="/learning-modules"
		class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
	>
		Back
	</a>
</div>

<style>
	input {
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE/Edge */
		user-select: none; /* Standard syntax */
	}
</style>
