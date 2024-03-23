<script lang="ts">
	import bellIcon from '$lib/assets/bell_icon_320.svg';
	import feedBackIcon from '$lib/assets/feedback_icon_320.svg';
	import exitIcon from '$lib/assets/exit_icon_320.svg';
</script>

<div class="w-full bg-main rounded-[10px] p-[14px]">
	<div class="flex flex-col gap-[10px]">
		<button class="flex items-center text-white text-[14px] justify-between w-full">
			<img src={bellIcon} alt="bell-icon" class="" />
			<p>Notifications</p>
		</button>

		<button class="flex items-center text-white text-[14px] justify-between w-full">
			<img src={feedBackIcon} alt="feedback-icon" class="" />
			<p>Give Feedback</p>
		</button>

		<hr class="border-[1px] border-submain" />

		<button class="flex items-center text-white text-[14px] justify-between w-full">
			<img src={exitIcon} alt="exit-icon" class="" />
			<p>Log out</p>
		</button>
	</div>
</div>
