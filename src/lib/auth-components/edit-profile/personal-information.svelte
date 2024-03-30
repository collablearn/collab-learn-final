<script lang="ts">
	import { enhance } from '$app/forms';

	let file: FileList;
</script>

<form
	method="post"
	action="/?/updatePersonalInformationAction"
	enctype="multipart/form-data"
	use:enhance
	class="flex flex-col gap-[10px]"
>
	<span class="text-main text-[14px] transition-all">Upload Profile</span>
	<label>
		<div
			class="outline-none w-full border-dashed text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		>
			<span class="font-semibold text-[14px]">{file ? file[0].name : 'Choose a file'}</span>
			<input name="profilePicture" type="file" class="hidden" accept=".png" bind:files={file} />
		</div>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Bio</span>
		<textarea
			name="bio"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">First Name</span>
		<input
			name="firstName"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Last Name</span>
		<input
			name="lastName"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Address</span>
		<input
			name="address"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Barangay</span>
		<input
			name="barangay"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">City</span>
		<input
			name="city"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Religion</span>
		<input
			name="religion"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Contact Number</span>
		<input
			name="contactNumber"
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<button
		type="submit"
		class="py-[11px] font-semibold text-[14px] flex items-center justify-center bg-main rounded-[10px] text-white"
		>Save Information
	</button>
</form>
