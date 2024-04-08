<script lang="ts">
	import { getAuthState } from '$lib';
	import DashboardJoinedGuilds from '$lib/auth-components/dashboard/dashboard-joined-guilds.svelte';
	import DashboardRecentProjects from '$lib/auth-components/dashboard/dashboard-recent-projects.svelte';
	import { fade } from 'svelte/transition';

	const authState = getAuthState();

	$authState.activeItem = '/dashboard';
</script>

<div class="p-[22px]" in:fade>
	<div class="">
		<DashboardRecentProjects />
	</div>

	<div class="mt-[60px]">
		<DashboardJoinedGuilds />
	</div>
</div>
