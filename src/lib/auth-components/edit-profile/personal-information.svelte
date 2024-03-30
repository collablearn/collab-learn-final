<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	let file: FileList;

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
	}

	let updateInfoLoader = false;
	let formActionError: UpdateInformationVal | null = null;
	const updatePersonalInformationActionNews: SubmitFunction = () => {
		updateInfoLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<UpdatePersonalInformation>;

			switch (status) {
				case 200:
					formActionError = null;
					toast.success('Personal Information', { description: msg });
					updateInfoLoader = false;
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
</script>

<form
	method="post"
	action="/?/updatePersonalInformationAction"
	enctype="multipart/form-data"
	use:enhance={updatePersonalInformationActionNews}
	class="flex flex-col gap-[10px]"
>
	<span class="text-main text-[14px] transition-all">Upload Profile</span>
	<label>
		<div
			class="outline-none w-full border-dashed text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		>
			<span class="font-semibold text-[14px]">{file ? file[0].name : 'Choose a file'}</span>
			<input
				name="profilePicture"
				type="file"
				class="hidden"
				accept=".png,jpeg,.jpg"
				bind:files={file}
			/>
		</div>
		{#each formActionError?.profilePicture ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Bio</span>
		<textarea
			name="bio"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.bio ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">First Name</span>
		<input
			name="firstName"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.firstName ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Last Name</span>
		<input
			name="lastName"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.lastName ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Address</span>
		<input
			name="address"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>
	{#each formActionError?.address ?? [] as errMsg}
		<p class="text-main text-[14px]" in:fade>{errMsg}</p>
	{/each}

	<label>
		<span class="text-main text-[14px] transition-all">Barangay</span>
		<input
			name="barangay"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.barangay ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">City</span>
		<input
			name="city"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.city ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Religion</span>
		<input
			name="religion"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.religion ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Contact Number</span>
		<input
			name="contactNumber"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.contactNumber ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>

	<button
		type="submit"
		class="py-[11px] font-semibold text-[14px] flex items-center justify-center bg-main rounded-[10px] text-white"
		>Save Information
	</button>
</form>
