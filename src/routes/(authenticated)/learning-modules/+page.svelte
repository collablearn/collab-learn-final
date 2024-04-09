<script lang="ts">
	import { createSearchStore, getAuthState, searchHandler } from '$lib';
	import LearningModuleSearch from '$lib/auth-components/learning-module/learning-module-search.svelte';
	import UploadModuleBtn from '$lib/auth-components/learning-module/upload-module-btn.svelte';
	import LearningModuleCard from '$lib/auth-components/learning-module/learning-module-card.svelte';
	import { fade } from 'svelte/transition';
	import LearningModuleContent from '$lib/auth-components/learning-module/learning-module-content.svelte';
	import type { LayoutData } from '../$types';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';

	export let data: LayoutData;

	const authState = getAuthState();

	$authState.activeItem = '/learning-modules';

	const generateClientCopy = () => {
		const generatedGuilds = $authState.modules.createdModules?.map((module) => ({
			...module,
			searchTerms: `${module.description} ${module.host_name} ${module.module_name} `
		}));

		return generatedGuilds;
	};

	let searchStore = createSearchStore(generateClientCopy() ?? []);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => unsubscribe());
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
					<LearningModuleSearch bind:searchTerm={$searchStore.search} />
				</div>

				<div class="grid gap-[20px] lg:grid-cols-2 mt-[35px]">
					{#each $searchStore.filtered ?? [] as moduleObj (moduleObj.id)}
						<div class="" animate:flip={{ duration: 360 }} transition:fade>
							<LearningModuleCard {moduleObj} supabase={data.supabase} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
