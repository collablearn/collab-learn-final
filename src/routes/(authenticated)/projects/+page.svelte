<script lang="ts">
	import { getActiveItem } from '$lib';
	import CreateProjectBtn from '$lib/auth-components/projects/create-project-btn.svelte';
	import SearchProject from '$lib/auth-components/projects/search-project.svelte';
	import ProjectCard from '$lib/auth-components/projects/project-card.svelte';
	import type { ProjectTypes } from '$lib/types';

	let activeItem = getActiveItem();

	$activeItem = '/projects';

	let sampleMockData: ProjectTypes[] = [
		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: true,
			onlineCount: 10,
			maxUsers: 50,
			hostName: 'Rodrigo'
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: false,
			onlineCount: 3,
			maxUsers: 30,
			hostName: 'Tigrel'
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: false,
			onlineCount: 2,
			maxUsers: 50,
			hostName: 'Granger'
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: false,
			onlineCount: 0,
			maxUsers: 50,
			hostName: 'Kimmy'
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: true,
			onlineCount: 10,
			maxUsers: 50,
			hostName: 'Vexana'
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: true,
			onlineCount: 3,
			maxUsers: 30,
			hostName: 'Lesley'
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: false,
			onlineCount: 2,
			maxUsers: 50,
			hostName: ''
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: false,
			onlineCount: 0,
			maxUsers: 50,
			hostName: 'Balmond'
		},

		{
			imageUrl: '',
			projectName: 'Enrollment System',
			projectDescription: 'To make enrollment online ',
			isPrivate: false,
			onlineCount: 1,
			maxUsers: 50,
			hostName: 'Hayabusa'
		}
	];
</script>

<div class="fixed bottom-0 right-0 m-[20px] z-10">
	<CreateProjectBtn />
</div>

<div class="">
	<div class="">
		<SearchProject />
	</div>

	<div class="flex flex-col gap-[20px] mt-[35px]">
		{#each sampleMockData as projectObj}
			<ProjectCard {projectObj} />
		{/each}

		<div class="">
			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				1
			</button>

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				2
			</button>

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				3
			</button>

			...

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				10
			</button>
		</div>
	</div>
</div>
