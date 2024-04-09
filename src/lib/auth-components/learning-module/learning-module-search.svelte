<script lang="ts">
	import seachIcon from '$lib/assets/guilds_search_icon_320.svg';

	export let searchTerm: string;
</script>

<div class="relative flex items-center">
	<input
		bind:value={searchTerm}
		placeholder="Search Module Name"
		type="text"
		class="outline-none w-full text-[14px] py-[11px] pl-[20px] pr-[40px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
	/>

	<div class="absolute right-0 mr-5">
		<img src={seachIcon} alt="search-icon" class="" />
	</div>
</div>

<style>
	::placeholder {
		color: #800000;
		opacity: 1; /* Firefox */
	}

	::-ms-input-placeholder {
		/* Edge 12-18 */
		color: #800000;
	}
</style>
