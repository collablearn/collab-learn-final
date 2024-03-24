<script lang="ts">
	import DashboardJoinedGuilds from '$lib/auth-components/dashboard/dashboard-joined-guilds.svelte';
	import DashboardRecentProjects from '$lib/auth-components/dashboard/dashboard-recent-projects.svelte';
</script>

<div class="">
	<div class="">
		<DashboardRecentProjects />
	</div>

	<div class="mt-[60px]">
		<DashboardJoinedGuilds />
	</div>
</div>
