<script lang="ts">
	import Loader from '$lib/general-components/loader.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col gap-[10px]">
	<label>
		<span class="text-main text-[14px] transition-all">Module Title</span>
		<input
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Attachment</span>
		<input
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Description</span>
		<textarea
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>
</div>

<div class="flex flex-col gap-[10px] mt-[40px]">
	<button
		class="bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
	>
		<Loader name="Create" txtColor="text-submain text-[14px]" />
	</button>

	<a
		href="/learning-modules"
		class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
	>
		Back
	</a>
</div>
