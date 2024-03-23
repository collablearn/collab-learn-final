<script lang="ts">
	import PersonalInformation from '$lib/auth-components/edit-profile/personal-information.svelte';
	import ChangePassword from '$lib/auth-components/edit-profile/change-password.svelte';

	let activeItem = 'Personal Information';
	const selections = ['Personal Information', 'Change Password'];
</script>

<div class="py-[44px] px-[22px]">
	<p class="text-[16px] text-main font-semibold">Edit Profile</p>

	<!--Switch Here-->
	<div class="flex flex-col gap-[10px] mt-[20px]">
		{#each selections as selection}
			<button
				class="text-main text-[14px] max-w-fit underline {activeItem === selection
					? 'font-semibold shadow-xs shadow-black'
					: ''}"
				on:click={() => (activeItem = selection)}>{selection}</button
			>
		{/each}
	</div>

	<div class=""></div>
</div>
