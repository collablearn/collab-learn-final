<script lang="ts">
	import burgerIcon from '$lib/assets/burger.svg';
	import userIcon from '$lib/assets/user_icon_320.svg';
	import UserModal from './navigation/user-modal.svelte';
</script>

<nav class="bg-main w-full px-[23px] py-[20px]">
	<div class="flex items-center justify-between">
		<div>
			<button>
				<img src={burgerIcon} alt="burger-icon" />
			</button>
		</div>

		<div class="flex items-center justify-center">
			<button>
				<img src={userIcon} alt="user-icon" />
			</button>
		</div>
	</div>
</nav>

<div class="w-[150px] float-right mt-[13px] mr-[20px]">
	<UserModal />
</div>
