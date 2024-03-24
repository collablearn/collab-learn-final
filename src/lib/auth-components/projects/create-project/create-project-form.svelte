<script lang="ts">
	import Loader from '$lib/general-components/loader.svelte';
	import { fade } from 'svelte/transition';

	const visibilitySelection = ['Public', 'Private'];

	let visibilityValue = 'Public';
</script>

<div class="flex flex-col gap-[10px]">
	<label>
		<span class="text-main text-[14px] transition-all">Project Name</span>
		<input
			type="text"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Users (Max. 50)</span>
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

<div class="mt-[35px]">
	<h3 class="text-[16px] text-main font-semibold">Guild Visibility</h3>
	<div class="flex items-center gap-[10px] mt-[10px]">
		{#each visibilitySelection as selection}
			<div class="flex items-center gap-[5px]">
				<input
					name="visibility"
					type="radio"
					class=""
					value={selection}
					bind:group={visibilityValue}
				/>
				<p class="text-[14px] text-main">{selection}</p>
			</div>
		{/each}
	</div>

	{#if visibilityValue === 'Private'}
		<div class="mt-[10px]" in:fade>
			<label>
				<span class="text-main text-[14px] transition-all">Passcode</span>
				<input
					type="password"
					class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
				/>
			</label>
		</div>
	{/if}
</div>

<form class="flex flex-col gap-[10px] mt-[40px]">
	<button
		class="bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
	>
		<Loader name="Create" txtColor="text-submain text-[14px]" />
	</button>

	<a
		href="/projects"
		class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
	>
		Back
	</a>
</form>
