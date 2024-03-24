<script lang="ts">
	import learningModIcon from '$lib/assets/learning_mod_icon_320.svg';

	let showLearningContent = false;
</script>

<div class="w-full">
	{#if showLearningContent}
		<div class="fixed left-0 right-0 top-0 bottom-0 bg-submain pt-[108px] px-[22px]">
			<div class="flex items-center gap-[10px]">
				<img src={learningModIcon} alt="sample-icon" />
				<div class="flex flex-col gap-[2px]">
					<h3 class="text-[16px] text-main font-semibold">Basic Elements of Design</h3>
					<p class="text-[14px] text-main">2 February 2022</p>
				</div>
			</div>

			<hr class="border-[1px] border-main my-[20px]" />

			<div class="">
				<p class="text-[14px] text-main">Attachments</p>

				<button
					class="py-[11px] px-[14px] text-[14px] text-submain bg-main rounded-[10px] mt-[22px]"
					>fundamentals.pdf</button
				>
			</div>

			<div class=""></div>
		</div>
	{:else}
		<button
			on:click={() => (showLearningContent = !showLearningContent)}
			class="bg-subwhite px-[13px] py-[16px] w-full rounded-[10px] shadow-sm shadow-black text-left"
		>
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
	{/if}
</div>
