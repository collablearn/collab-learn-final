<script lang="ts">
	import learningModIcon from '$lib/assets/learning_mod_icon_320.svg';
</script>

<button class="bg-subwhite px-[13px] py-[16px] rounded-[10px] shadow-sm shadow-black text-left">
	<div class="flex items-center gap-[20px]">
		<div class="">
			<img src={learningModIcon} alt="sample-icon" />
		</div>

		<div class="flex flex-col gap-[5px] w-full">
			<p class="text-[16px] text-main font-semibold">Richa Gupta</p>
			<p class="text-[14px] text-main">Uploaded a module:</p>
			<p class="text-[14px] text-main">Feb 2, 2022</p>
		</div>
	</div>
</button>
