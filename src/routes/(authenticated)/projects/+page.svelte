<script lang="ts">
	import { createSearchStore, getAuthState, searchHandler } from '$lib';
	import CreateProjectBtn from '$lib/auth-components/projects/create-project-btn.svelte';
	import SearchProject from '$lib/auth-components/projects/search-project.svelte';
	import ProjectCard from '$lib/auth-components/projects/project-card.svelte';
	import { fade } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';

	let authState = getAuthState();

	$authState.activeItem = '/projects';

	const generateClientCopy = () => {
		const generatedGuilds = $authState.projects.createdProjects?.map((project) => ({
			...project,
			searchTerms: `${project.description} ${project.host_name} ${project.project_name} `
		}));

		return generatedGuilds;
	};

	let searchStore = createSearchStore(generateClientCopy() ?? []);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => unsubscribe());
</script>

<div class="p-[22px] relative min-h-screen" in:fade>
	<div class="fixed bottom-0 right-0 m-[20px] z-10">
		<CreateProjectBtn />
	</div>

	<div class="">
		<div class="">
			<SearchProject bind:searchTerm={$searchStore.search} />
		</div>

		<div class="grid gap-[20px] lg:grid-cols-2 mt-[35px]">
			{#each $searchStore.filtered ?? [] as projectObj (projectObj.id)}
				<div class="w-full" animate:flip={{ duration: 360 }} transition:fade>
					<ProjectCard {projectObj} />
				</div>
			{/each}
		</div>
	</div>
</div>
