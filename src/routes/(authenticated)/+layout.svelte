<script lang="ts">
	import Nav from '$lib/auth-components/nav.svelte';
	import { getAuthState, getUserState, setAuthState, setUserState } from '$lib';
	import ProjectJoinedContent from '$lib/auth-components/projects/join-project/project-joined-content.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	setUserState(data.userData.data);
	const userState = getUserState();
	$: data.userData.data ? ($userState = data.userData.data) : ($userState = null);

	setAuthState({
		activeItem: '/dashboard',
		projects: {
			joinedProject: false,
			showEditTools: false
		},
		guilds: {
			createdGuilds: data.createdGuilds.data,
			joinedGuild: false,
			guildObj: {
				imageUrl: '',
				hostName: '',
				maxUsers: 0,
				guildName: '',
				guildDescription: '',
				isPrivate: false,
				joinedCount: 0
			}
		}
	});
	const authState = getAuthState();
</script>

<div class=" bg-submain">
	{#if $authState.projects.joinedProject}
		<ProjectJoinedContent />
	{:else}
		<div class="sticky top-0 z-20">
			<Nav />
		</div>

		<div class="min-h-screen px-[22px] py-[50px]">
			<slot />
		</div>
	{/if}
</div>
