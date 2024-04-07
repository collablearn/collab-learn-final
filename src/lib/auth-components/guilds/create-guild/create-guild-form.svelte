<script lang="ts">
	import uploadIcon from '$lib/assets/upload_icon.svg';
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { getUserState } from '$lib';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	const userState = getUserState();

	const visibilitySelection = ['Public', 'Private'];

	interface CreateGuild {
		guildPhoto: string[];
		guildName: string[];
		maxUsers: string[];
		description: string[];
		passcode: string[];
	}

	interface CreateGuildAction {
		msg: string;
		errors: CreateGuild;
	}

	//for uploading profile
	let uploadLoader = false;
	let previewURL: string | undefined;
	let files: FileList | undefined = undefined;

	const handleFileChange = (event: Event) => {
		const fileInput = event.currentTarget as HTMLInputElement;
		const file = fileInput.files?.[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = () => {
				previewURL = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	let visibilityValue = 'Public';
	let formActionError: CreateGuild | null = null;
	let createGuildLoader = false;

	$: visibilityValue != 'Public' ? (formActionError = null) : (formActionError = null);

	const createGuildActionNews: SubmitFunction = () => {
		createGuildLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<CreateGuildAction>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Create Guild', { description: msg });
					formActionError = null;
					createGuildLoader = false;
					await tick();
					goto('/guilds');
					break;

				case 400:
					formActionError = errors;
					createGuildLoader = false;
					break;

				case 401:
					toast.error('Create Guild', { description: msg });
					formActionError = null;
					createGuildLoader = false;
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
	action="/APIS?/createGuildAction"
	enctype="multipart/form-data"
	use:enhance={createGuildActionNews}
	class=""
>
	<input
		autocomplete="off"
		name="hostPhoto"
		type="hidden"
		class="hidden"
		value={$userState?.user_photo_link}
	/>

	<input
		autocomplete="off"
		name="hostName"
		type="hidden"
		class="hidden"
		value={$userState?.user_fullname}
	/>
	<div class="flex flex-col gap-[10px]">
		<div class="bg-main text-submain text-[14px] p-[10px] rounded-[10px]">
			<p>Note:</p>
			<p>
				Due to the free plan tier of hosting, we have limited the size requirement to a maximum of
				1MB or 1024KB. You are old enough to Google things if you don't know!
			</p>
		</div>

		<div class="flex items-center gap-[10px]">
			<div class="">
				{#if previewURL}
					<img src={previewURL} alt="sample-icon" class="h-[71px] w-[71px] rounded-full" />
				{/if}
			</div>
			<label>
				<div
					class="transition-all active:bg-main/50 cursor-pointer max-w-fit text-[14px] font-semibold h-[40px] rounded-[10px] bg-main text-submain px-[10px] flex items-center"
				>
					<div class="flex items-end gap-[10px]">
						<img src={uploadIcon} alt="upload-icon" />
						<span>Upload Guild Photo</span>
						<input
							autocomplete="off"
							type="file"
							name="guildPhoto"
							class="hidden"
							bind:files
							on:change={handleFileChange}
							accept=".png, .jpg, .jpeg"
						/>
					</div>
				</div>
			</label>
		</div>

		{#each formActionError?.guildPhoto ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
		<label>
			<span class="text-main text-[14px] transition-all">Guild Name</span>
			<input
				autocomplete="off"
				name="guildName"
				type="text"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.guildName ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>

		<label>
			<span class="text-main text-[14px] transition-all">Users (Max. 50)</span>
			<input
				autocomplete="off"
				name="maxUsers"
				type="number"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.maxUsers ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>

		<label>
			<span class="text-main text-[14px] transition-all">Description</span>
			<textarea
				name="description"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.description ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>
	</div>

	<div class="mt-[35px]">
		<h3 class="text-[16px] text-main font-semibold">Guild Visibility</h3>
		<div class="flex items-center gap-[10px] mt-[10px]">
			{#each visibilitySelection as selection}
				<div class="flex items-center gap-[5px]">
					<input
						autocomplete="off"
						name="visibility"
						type="radio"
						class=""
						value={selection}
						bind:group={visibilityValue}
					/>
					<p class="text-[14px] text-main">{selection}</p>
				</div>
			{/each}
		</div>

		{#if visibilityValue === 'Private'}
			<div class="mt-[10px]" in:fade>
				<label>
					<span class="text-main text-[14px] transition-all">Passcode</span>
					<input
						autocomplete="off"
						name="passcode"
						type="password"
						class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
					/>
					{#each formActionError?.passcode ?? [] as errMsg}
						<p class="text-main text-[14px]" in:fade>{errMsg}</p>
					{/each}
				</label>
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-[10px] mt-[40px]">
		<button
			disabled={createGuildLoader}
			class="{createGuildLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
			w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
		>
			{#if createGuildLoader}
				Creating...
			{:else}
				Create
			{/if}
		</button>

		<a
			href="/guilds"
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
