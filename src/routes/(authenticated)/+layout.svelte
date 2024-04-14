<script lang="ts">
	import Nav from '$lib/auth-components/navigation/nav.svelte';
	import {
		getAuthState,
		getUserState,
		setAuthState,
		setUserState,
		type AuthStateStoreTypes
	} from '$lib';
	import ProjectJoinedContent from '$lib/auth-components/projects/join-project/project-joined-content.svelte';
	import type { LayoutServerData } from './$types';
	import Desktop from '$lib/auth-components/navigation/desktop.svelte';

	export let data: LayoutServerData;

	const defaulState: AuthStateStoreTypes = {
		activeItem: '/dashboard',
		dashboard: {
			recentProjectArray: null,
			joinedGuildArray: null
		},

		projects: {
			createdProjects: null,
			projectObj: null,
			joinedProject: false,
			showEditTools: false,
			showSettings: false
		},
		guilds: {
			createdGuilds: null,
			joinedGuild: false,
			guildObj: null,
			guildNotes: null,
			guildNoteObj: null,
			guildChats: null
		},
		modules: {
			createdModules: null,
			moduleObj: null,
			showModule: false,
			moduleComments: null
		}
	};

	setUserState(data.userData.data);
	const userState = getUserState();
	$: data.userData.data ? ($userState = data.userData.data) : ($userState = null);

	setAuthState(defaulState);
	const authState = getAuthState();

	// making created guild array reactive
	$: if (data.createdGuilds.data) {
		$authState.guilds.createdGuilds = data.createdGuilds.data;
	} else {
		$authState.guilds.createdGuilds = null;
	}

	// making joined guild array reactive
	$: console.log(data.joinedGuilds.data);
	$: if (data.joinedGuilds.data) {
		$authState.dashboard.joinedGuildArray = data.joinedGuilds.data;
	} else {
		$authState.dashboard.joinedGuildArray = null;
	}

	// making recent project array reactive
	$: if (data.recentProjects.data) {
		$authState.dashboard.recentProjectArray = data.recentProjects.data;
	}

	// making created projects array reactive
	$: if (data.createdProjects.data) {
		$authState.projects.createdProjects = data.createdProjects.data;
	} else {
		$authState.projects.createdProjects = null;
	}

	// making created modules array reactive
	$: if (data.createdModules.data) {
		$authState.modules.createdModules = data.createdModules.data;
	} else {
		$authState.modules.createdModules = null;
	}
</script>

<div class=" bg-submain">
	{#if $authState.projects.joinedProject}
		<ProjectJoinedContent />
	{:else}
		<div class="w-full">
			<div class="sticky top-0 z-20">
				<Nav />
			</div>

			<div class="flex min-h-screen">
				<div class="w-[350px] bg-[#691D1F] hidden md:block">
					<div class="">
						<Desktop />
					</div>
				</div>

				<div class="min-h-screen w-full overflow-y-auto">
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>
