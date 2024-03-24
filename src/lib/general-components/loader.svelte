<script lang="ts">
	export let name = '';
	export let loader = false;
	export let loaderName = '';
	export let style = 'border-b-submain border-main';
	export let txtColor = 'text-main text-[14px]';
</script>

<!--
	@component
	default values:
	style = "border-b-submain border-main"
	txtColor = "text-main text-[14px]"
-->

<div class="">
	{#if loader}
		<div class="flex items-center gap-[2px]">
			<p class={txtColor}>{loaderName}</p>
			<div class="w-4 h-4 {style} border-2 animate-spin rounded-full"></div>
		</div>
	{:else}
		<p class={txtColor}>{name}</p>
	{/if}
</div>
