<script lang="ts">
	import { getAuthState } from '$lib';
	import DashboardDesktop from '$lib/auth-components/dashboard/dashboard-desktop.svelte';
	import DashboardJoinedGuilds from '$lib/auth-components/dashboard/dashboard-joined-guilds.svelte';
	import DashboardRecentProjects from '$lib/auth-components/dashboard/dashboard-recent-projects.svelte';
	import { fade } from 'svelte/transition';

	const authState = getAuthState();

	$authState.activeItem = '/dashboard';
</script>

<div class="p-[22px] flex flex-col gap-[20px]" in:fade>
	<div class="hidden md:flex">
		<DashboardDesktop />
	</div>

	<div class="">
		<DashboardRecentProjects />
	</div>

	<div class="">
		<DashboardJoinedGuilds />
	</div>
</div>
