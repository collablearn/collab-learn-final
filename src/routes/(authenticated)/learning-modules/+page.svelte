<script lang="ts">
	import { getAuthState } from '$lib';
	import LearningModuleSearch from '$lib/auth-components/learning-module/learning-module-search.svelte';
	import UploadModuleBtn from '$lib/auth-components/learning-module/upload-module-btn.svelte';
	import LearningModuleCard from '$lib/auth-components/learning-module/learning-module-card.svelte';
	import { fade } from 'svelte/transition';
	import LearningModuleContent from '$lib/auth-components/learning-module/learning-module-content.svelte';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	const authState = getAuthState();

	$authState.activeItem = '/learning-modules';
</script>

<div class="p-[22px]">
	{#if $authState.modules.showModule}
		<LearningModuleContent supabase={data.supabase} />
	{:else}
		<div class="" in:fade>
			<div class="fixed bottom-0 right-0 m-[20px] z-10">
				<UploadModuleBtn />
			</div>

			<div class="">
				<div class="">
					<LearningModuleSearch />
				</div>

				<div class="flex flex-col gap-[20px] mt-[35px]">
					{#each $authState.modules.createdModules ?? [] as moduleObj}
						<LearningModuleCard {moduleObj} supabase={data.supabase} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
