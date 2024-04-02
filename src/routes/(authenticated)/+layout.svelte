<script lang="ts">
	import Nav from '$lib/auth-components/nav.svelte';
	import { getAuthState, getUserState, setAuthState, setUserState } from '$lib';
	import ProjectJoinedContent from '$lib/auth-components/projects/join-project/project-joined-content.svelte';
	import type { LayoutServerData } from './$types';
	import { number } from 'zod';

	export let data: LayoutServerData;

	const defaulState = {
		activeItem: '/dashboard',
		projects: {
			joinedProject: false,
			showEditTools: false
		},
		guilds: {
			createdGuilds: data.createdGuilds.data,
			joinedGuild: false,
			guildObj: {
				id: 0,
				created_at: '',
				user_id: '',
				host_name: '',
				is_private: false,
				guild_name: '',
				max_users: 0,
				joined_count: 0,
				description: '',
				passcode: '',
				image_url: ''
			}
		}
	};

	setUserState(data.userData.data);
	const userState = getUserState();
	$: data.userData.data ? ($userState = data.userData.data) : ($userState = null);

	setAuthState(defaulState);
	const authState = getAuthState();

	// making created guild reactive
	$: data.createdGuilds.data
		? ($authState.guilds.createdGuilds = data.createdGuilds.data)
		: ($authState.guilds.createdGuilds = null);
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
