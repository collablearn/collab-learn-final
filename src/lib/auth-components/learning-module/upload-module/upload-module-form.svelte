<script lang="ts">
	import { onMount } from 'svelte';
	import uploadIcon from '$lib/assets/upload_icon.svg';

	let file: FileList | undefined;
	let pdfSrc: string = ''; // Variable to hold the source URL of the PDF file
	let loading: boolean = false; // State variable to track loading status

	// Function to handle file selection
	const handleFileChange = () => {
		const selectedFile = file && file[0]; // Get the first selected file (assuming single file selection)

		if (selectedFile) {
			const objectUrl = URL.createObjectURL(selectedFile); // Create object URL for the selected file
			pdfSrc = objectUrl; // Set the source URL for the embedded PDF directly
		}
	};

	// Initialize PDF source when the component mounts
	onMount(() => {
		handleFileChange(); // Call handleFileChange initially to set PDF source if a file is pre-selected
	});
</script>

<div class="flex flex-col gap-[10px]">
	<!-- Embed PDF viewer -->

	{#if pdfSrc}
		<embed
			id="pdfEmbed"
			src={pdfSrc}
			type="application/pdf"
			class="h-[700px]"
			on:load={() => (loading = false)}
		/>
		<div class="flex items-center gap-[10px]">
			<button
				on:click={() => {
					file = undefined;
					pdfSrc = '';
				}}
				class="bg-main text-submain font-semibold h-[40px] w-full px-[20px] text-[14px] rounded-[10px]"
				>Cancel Preview</button
			>
		</div>
	{:else}
		<p class="text-[14px] text-main">No PDF selected.</p>
	{/if}

	<div class={file ? 'hidden' : ''}>
		<label>
			<div
				class="transition-all active:bg-main/80 cursor-pointer max-w-fit text-[14px] font-semibold h-[40px] rounded-[10px] bg-main text-submain px-[10px] flex items-center"
			>
				<div class="flex items-end gap-[10px]">
					<img src={uploadIcon} alt="upload-icon" />
					<span>Upload PDF Module</span>
					<input
						autocomplete="off"
						type="file"
						name="uploadProfile"
						class="hidden"
						bind:files={file}
						accept=".pdf"
						on:change={handleFileChange}
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
