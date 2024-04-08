<script lang="ts">
	import { getUserState } from '$lib';

	const userState = getUserState();
</script>

<div class="h-[150px] rounded-[10px] bg-main w-full flex items-center gap-[20px] p-[50px] relative">
	<div class=" absolute bottom-0 right-0 mb-[20px] mr-[10px]">
		<a href="/edit-profile" class="text-[14px] text-main bg-submain rounded-[10px] p-[10px]"
			>Edit Profile
		</a>
	</div>

	<div class="">
		<img
			src={$userState?.user_photo_link}
			alt="profile-icon"
			class="w-[100px] h-[100px] rounded-full"
		/>
	</div>

	<div class="">
		<p class="text-white text-[20px]">{$userState?.user_fullname}</p>
		<p class="text-white text-[14px]">{$userState?.user_bio}</p>
	</div>
</div>
