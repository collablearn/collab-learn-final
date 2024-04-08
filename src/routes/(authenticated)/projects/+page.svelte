<script lang="ts">
	import { getAuthState } from '$lib';
	import CreateProjectBtn from '$lib/auth-components/projects/create-project-btn.svelte';
	import SearchProject from '$lib/auth-components/projects/search-project.svelte';
	import ProjectCard from '$lib/auth-components/projects/project-card.svelte';
	import { mockDatas } from '$lib';
	import { fade } from 'svelte/transition';

	let authState = getAuthState();

	$authState.activeItem = '/projects';
</script>

<div class="p-[22px] relative min-h-screen" in:fade>
	<div class="fixed bottom-0 right-0 m-[20px] z-10">
		<CreateProjectBtn />
	</div>

	<div class="">
		<div class="">
			<SearchProject />
		</div>

		<div class="grid gap-[20px] lg:grid-cols-2 mt-[35px]">
			{#each $authState.projects.createdProjects ?? [] as projectObj}
				<ProjectCard {projectObj} />
			{/each}
		</div>
	</div>
</div>
