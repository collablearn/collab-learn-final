<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { fade, fly } from 'svelte/transition';
	import sampleDisplayIcon from '$lib/assets/sampelDisplayIcon.svg';
	import uploadIcon from '$lib/assets/upload_icon.svg';
	import type { User } from '@supabase/supabase-js';
	import clearIcon from '$lib/assets/clear_icon.svg';
	import { getUserState } from '$lib';
	import { invalidateAll } from '$app/navigation';

	const userState = getUserState();

	let file: FileList | undefined;
	let defaultState = true;

	interface UpdateInformationVal {
		bio: string[];
		firstName: string[];
		lastName: string[];
		address: string[];
		barangay: string[];
		city: string[];
		religion: string[];
		contactNumber: string[];
		profilePicture: string[];
	}

	interface UpdatePersonalInformation {
		msg: string;
		errors: UpdateInformationVal;
		user: User;
	}

	let updateInfoLoader = false;
	let formActionError: UpdateInformationVal | null = null;
	const updatePersonalInformationActionNews: SubmitFunction = () => {
		updateInfoLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors, user }
			} = result as ResultModel<UpdatePersonalInformation>;

			switch (status) {
				case 200:
					invalidateAll();
					formActionError = null;
					toast.success('Personal Information', { description: msg });
					updateInfoLoader = false;
					defaultState = true;
					break;

				case 400:
					formActionError = errors;
					updateInfoLoader = false;
					break;

				case 401:
					formActionError = null;
					toast.error('Personal Information', { description: msg });
					updateInfoLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};

	//for uploading profile
	let uploadLoader = false;
	let previewURL: string | undefined;

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
	const uploadProfileActionNews: SubmitFunction = () => {
		uploadLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, user }
			} = result as ResultModel<{ msg: string; user: User }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Upload Profile', { description: msg });
					uploadLoader = false;
					file = undefined;
					previewURL = undefined;
					defaultState = true;
					break;

				case 401:
					toast.error('Upload Profile', { description: msg });
					uploadLoader = false;
					file = undefined;
					previewURL = undefined;
					console.log(msg);
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<!--For upload profile-->
<form
	method="post"
	action="/?/uploadProfileAction"
	enctype="multipart/form-data"
	use:enhance={uploadProfileActionNews}
	class="flex items-end justify-between"
>
	<div class="">
		{#if previewURL}
			<img src={previewURL} alt="sample-icon" class="h-[71px] w-[71px] rounded-full" />

			<button
				class="flex items-center gap-[10px] w-[100px]"
				on:click={() => {
					file = undefined;
					previewURL = undefined;
				}}
			>
				<p class="text-[14px] text-main line-clamp-1 font-semibold">Preview</p>
				<img src={clearIcon} alt="clear-icon" class="" />
			</button>
		{:else}
			<img
				src={$userState?.user_photo_link ?? sampleDisplayIcon}
				alt="sample-icon"
				class="h-[71px] w-[71px] rounded-full"
			/>
		{/if}
	</div>

	<div class="flex flex-col gap-[20px] w-[165px]">
		<button
			disabled={uploadLoader}
			type="submit"
			class="{file ? '' : 'hidden'} {uploadLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
				transition-all active:bg-main/80 cursor-pointer w-full text-[14px] font-semibold h-[40px] rounded-[10px] text-submain px-[10px]"
			>{#if uploadLoader}
				Uploading...
			{:else}
				Upload
			{/if}
		</button>

		<div class={file ? 'hidden' : ''}>
			<label>
				<div
					class="transition-all active:bg-main/80 cursor-pointer w-full text-[14px] font-semibold h-[40px] rounded-[10px] bg-main text-submain px-[10px] flex items-center"
				>
					<div class="flex items-end gap-[10px]">
						<img src={uploadIcon} alt="upload-icon" />
						<span>Upload Profile</span>
						<input
							autocomplete="off"
							type="file"
							name="uploadProfile"
							class="hidden"
							bind:files={file}
							on:change={handleFileChange}
							accept=".png, .jpg, .jpeg"
						/>
					</div>
				</div>
			</label>
		</div>
	</div>
</form>

<!--For Update Information-->
<form
	method="post"
	action="/?/updatePersonalInformationAction"
	enctype="multipart/form-data"
	use:enhance={updatePersonalInformationActionNews}
	class="flex flex-col gap-[10px] mt-[20px]"
>
	<label>
		<span class="text-main text-[14px] transition-all">Bio</span>
		<textarea
			autocomplete="off"
			value={defaultState ? $userState?.user_bio : ''}
			disabled={defaultState}
			name="bio"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'} 
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.bio ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">First Name</span>
		<input
			autocomplete="off"
			value={defaultState ? $userState?.user_fullname.split(', ')[1] : ''}
			disabled={defaultState}
			name="firstName"
			type="text"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'} 
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.firstName ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Last Name</span>
		<input
			autocomplete="off"
			value={defaultState ? $userState?.user_fullname.split(', ')[0] : ''}
			disabled={defaultState}
			name="lastName"
			type="text"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'}
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.lastName ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Address</span>
		<input
			autocomplete="off"
			value={defaultState ? $userState?.user_address : ''}
			disabled={defaultState}
			name="address"
			type="text"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'}
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>
	{#each formActionError?.address ?? [] as errMsg}
		<p class="text-main text-[14px]" in:fade>{errMsg}</p>
	{/each}

	<label>
		<span class="text-main text-[14px] transition-all">Barangay</span>
		<input
			autocomplete="off"
			value={defaultState ? $userState?.user_barangay : ''}
			disabled={defaultState}
			name="barangay"
			type="text"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'}
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.barangay ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">City</span>
		<input
			autocomplete="off"
			value={defaultState ? $userState?.user_city : ''}
			disabled={defaultState}
			name="city"
			type="text"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'}
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.city ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Religion</span>
		<input
			autocomplete="off"
			value={defaultState ? $userState?.user_religion : ''}
			disabled={defaultState}
			name="religion"
			type="text"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'}
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.religion ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Contact Number</span>
		<input
			autocomplete="off"
			value={defaultState ? $userState?.user_contact : ''}
			disabled={defaultState}
			name="contactNumber"
			type="text"
			class="{defaultState ? 'bg-submain' : 'bg-subwhite'}
			outline-none w-full text-[14px] py-[11px] px-[20px] text-main border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.contactNumber ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<div class="flex items-center gap-[10px]">
		{#if defaultState}
			<button
				on:click={() => (defaultState = false)}
				disabled={updateInfoLoader}
				type="button"
				class="
		py-[11px] font-semibold text-[14px] w-full flex items-center justify-center rounded-[10px] bg-main text-submain"
				>Update Information
			</button>
		{:else}
			<button
				in:fly={{ x: 50, duration: 300 }}
				on:click={() => {
					defaultState = true;
					formActionError = null;
				}}
				disabled={updateInfoLoader}
				type="button"
				class=" border-[1px] border-main
		py-[10px] font-semibold text-[14px] w-full flex items-center justify-center rounded-[10px] text-main bg-submain"
				>Cancel
			</button>
			<button
				in:fly={{ x: -50, duration: 300 }}
				disabled={updateInfoLoader}
				type="submit"
				class="{updateInfoLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'} 
		py-[11px] font-semibold text-[14px] w-full flex items-center justify-center rounded-[10px] text-submain"
				>{#if updateInfoLoader}
					Saving...
				{:else}
					Save Information
				{/if}
			</button>
		{/if}
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
