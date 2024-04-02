<script lang="ts">
</script>

<div
	class="bg-submain p-[10px] rounded-[10px] flex flex-col gap-[10px] transition-all"
	transition:fade
>
	<p class="text-main text-[14px]">
		Create a complex password with a mix of uppercase and lowercase letters, numbers, and symbols.
	</p>

	<div class="max-w-fit">
		<p class="text-main text-[14px]">Sample:</p>

		<p class="  text-main text-[14px] rounded-[10px]">
			{samplePasswords[Math.floor(Math.random() * 20)]}
		</p>
	</div>
</div>
