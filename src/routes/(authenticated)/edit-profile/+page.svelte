<script lang="ts">
	import PersonalInformation from '$lib/auth-components/edit-profile/personal-information.svelte';
	import ChangePassword from '$lib/auth-components/edit-profile/change-password.svelte';

	let activeItem = 'Personal Information';
	const selections = ['Personal Information', 'Change Password'];
</script>

<div class="">
	<p class="text-[16px] text-main font-semibold">Edit Profile</p>

	<!--Switch Here-->
	<div class="flex flex-col gap-[10px] mt-[20px]">
		{#each selections as selection}
			<button
				class="text-main text-[14px] max-w-fit underline transition-all {activeItem === selection
					? 'font-semibold shadow-xs shadow-black'
					: ''}"
				on:click={() => (activeItem = selection)}>{selection}</button
			>
		{/each}
	</div>

	<div class="mt-[27px]">
		{#if activeItem === 'Personal Information'}
			<PersonalInformation />
		{:else if activeItem === 'Change Password'}
			<ChangePassword />
		{/if}
	</div>
</div>
