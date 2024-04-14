<script lang="ts">
	import { getUserState } from '$lib';
	import dashboardIdlIcon from '$lib/assets/dashboard_idl_icon.svg';

	const userState = getUserState();
</script>

<div class=" rounded-[10px] bg-main w-full gap-[20px] relative p-[10px]">
	<div class="flex gap-[20px]">
		<div class="w-[150px]">
			<img src={$userState?.user_photo_link ?? dashboardIdlIcon} alt="" class="rounded-full" />
		</div>

		<div class="w-full">
			<p class="text-[24px] text-white">{$userState?.user_fullname}</p>
			<p class="text-[14px] text-white">
				{$userState?.user_bio ?? 'You have no bio.'}
			</p>
		</div>
	</div>

	<div class="flex justify-end mt-[20px]">
		<a
			href="/edit-profile"
			class="text-[14px] font-semibold bg-submain text-main p-[10px] flex items-center rounded-[10px]"
			>Edit Profile</a
		>
	</div>
</div>
